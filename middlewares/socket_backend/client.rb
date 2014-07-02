module SocketBackend
  class Client
    attr_reader :id, :socket, :room

    def initialize(socket)
      @socket = socket
      @user_id = nil
    end

    def authorized?
      !!@user_id
    end

    def set_id(room, id)
      @room = room
      @id = id
      msg_you_are id if authorized?
    end

    def msg_you_are(what)

    end

  end
end