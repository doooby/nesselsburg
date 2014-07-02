module S3ocketServer
  class Client

    attr_reader :id, :socket, :room

    def initialize(socket)
      @socket = socket
      @user_login = nil

      @socket.on :message do |event|
        data = JSON.parse event.data
        iam = data['iam']
        if iam
          @user_login = iam['login']
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
      !!@user_login
    end

    def user
      @user_login.present? && @user_login
    end

    def set_id(room, id)
      @room = room
      @id = id
      msg_you_are id if authorized?
    end

    def send(hash={})
      @socket.send hash.to_json
    end

    def on_msg(msg, to)
      case to
        when 's'
          @room.on_internal_msg self, msg
        when 'a'
          @room.send_to_all self, msg
        else
          arr = to.present? && to.split('|').uniq.compact.delete_if{|id| id.empty?}
          @room.send_to_ids self, arr, msg unless arr.empty?
      end
    end

    def msg_you_are(what)
      json_what = {'yr' => what}.to_json
      @socket.send json_what
    end

  end
end
