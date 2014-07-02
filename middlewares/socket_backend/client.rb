module SocketBackend
  class Client
    attr_reader :id, :socket, :room

    def initialize(socket)
      @socket = socket
      @user_id = nil

      @socket.on :message do |event|
        data = JSON.parse event.data
        iam = data['iam']
        if iam
          @user_id = iam['login']
          msg_you_are @id
        else
          if authorized?
            msg = data[@id.to_s]
            on_msg msg, data['to'] if msg
          else
            msg_you_are 'who?'
          end
        end
      end
    end

    def ==(other)
      if id && other.id
        id==other.id
      else
        super
      end
    end

    def authorized?
      !!@user_id
    end

    def set_id(room, id)
      @room = room
      @id = id
      msg_you_are id if authorized?
    end

    def on_msg(msg, to)
      case to
        when 'a'
          @room.send_to_all self, {@id => msg}
        when 'r'
          @room.on_internal_msg self, msg
        when 's'
          @room.server.on_internal_msg self, msg
        else
          arr = to.present? && to.split('|').compact.uniq
          unless arr.empty?
            msg = {@id => msg}
            arr.each{|to_id| @room.send_to_id to_id, msg}
          end
      end
    end

    def msg_you_are(what)
      json_what = {'yr' => what}.to_json
      @socket.send json_what
    end

  end
end