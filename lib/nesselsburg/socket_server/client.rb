module SocketServer
  class Client

    attr_reader :user, :socket

    def initialize(user, socket)
      @user = user
      @socket = socket

      socket.on :message do |event|
        data = JSON.parse event.data rescue next
        Rails.logger.debug "SOCKET: (#{user.username}) #{data}"
        on_data data['msg'], data
      end
    end

    def on_data(msg, data)
      to = data['to']
      if to.nil?
        # internal message

      else
        # for a particular user/s

      end
    end

    def ==(other)
      user == other.user
    end

  end
end