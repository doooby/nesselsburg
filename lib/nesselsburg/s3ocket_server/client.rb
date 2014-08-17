module S3ocketServer
  class Client
    attr_reader :id, :socket, :room

    def initialize(socket)
      @socket = socket
      @user_id = nil

      @socket.on :message do |event|
        data = JSON.parse event.data rescue nil
        next unless data
        Rails.logger.debug "SOCKET: (#{id}) #{data}"
        on_data data
      end
    end

    def on_data(data)
      iam = data['iam']
      if iam
        @user_id = iam['login'] || 'host'
        msg_you_are @id
      else
        if authorized?
          on_msg data['to'], data['msg'], data['task']
        else
          msg_you_are 'who?'
        end
      end
    rescue  => e
      el = Nesselsburg::ExceptionLog.from_exception e
      el.other_info = {data: data}
      el.save!
    end

    def set_id(room, id)
      @room = room
      @id = id
      msg_you_are id if authorized?
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

    def user
      @user_id
    end

    def on_msg(to, msg, task)
      to = to.to_s
      case to
        when 'a'
          @room.send_to_all self, msg, task
        when 's'
          @room.on_internal_msg self, msg, task
        else
          arr = to.present? && to.split('|').compact.uniq
          unless arr.empty?
            arr.each{|to_id| @room.send_to_id to_id.to_i, self, msg, task}
          end
      end
    end

    def msg_you_are(what)
      @socket.send({yr: what}.to_json)
    end
  end
end