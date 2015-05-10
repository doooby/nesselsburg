require 'faye/websocket'

module SocketServer
  class Middleware
    KEEPALIVE_TIME = 15 # in s

    def initialize(app)
      @app     = app
      # @main_chamber = S3ocketServer::Room.new self
    end

    def call(env)
      if Faye::WebSocket.websocket?(env)
        current_user = env['warden'].authenticate scope: 'user'
        return [401, {}, []] unless current_user

        ws = Faye::WebSocket.new(env, nil, {ping: KEEPALIVE_TIME })
        client = SocketServer::Client.new current_user, ws

        ws.on :open do |event|
          # @main_chamber.on_client_entered client
        end

        ws.on :close do |event|
          # @main_chamber.on_client_left client
        end

        ws.rack_response
      else
        @app.call(env)
      end
    end
  end
end