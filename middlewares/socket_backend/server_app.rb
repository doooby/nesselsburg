module SocketBackend
  class ServerApp
    KEEPALIVE_TIME = 15 # in s

    def initialize(app)
      @app     = app
      @main_chamber = SocketBackend::Room.new self
    end

    def call(env)
      if Faye::WebSocket.websocket?(env)
        ws = Faye::WebSocket.new(env, nil, {ping: KEEPALIVE_TIME })
        client = SocketBackend::Client.new ws

        ws.on :open do |event|
          # p [:open, ws.object_id]
          @main_chamber.on_client_enter client
        end

        ws.on :message do |event|
          # p [:message, event.data]
          ws.send event.data
        end

        ws.on :close do |event|
          # p [:close, ws.object_id, event.code, event.reason]
          @main_chamber.on_client_leave client
          ws = nil
          client = nil
        end

        ws.rack_response
      else
        @app.call(env)
      end
    end

    def conout(text, konzole_id=2)
      %x(echo "#{text}" > /dev/pts/#{konzole_id})
    end

  end
end