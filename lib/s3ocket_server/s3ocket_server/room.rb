module S3ocketServer
  class Room
    attr_reader :server

    def initialize(server)
      @server = server
      @client_id = 0
      @clients = {}
    end

    def clients_count
      @clients.values.length
    end

    def take_client_id
      @client_id += 1
    end

    def on_client_entered(client)
      client.set_id self, take_client_id
      @clients[client.id] = client
    end

    def on_client_left(client)
      @clients.delete client.id
    end

    def on_internal_msg(client, msg, task)
      ret_msg = case msg
                  when 'get_all_authorized'
                    @clients.values.select{|c| c.authorized?}.inject({}){|h, c| h[c.id] = c.user; h}
                  else nil
                end
      send_to client, ret_msg, task
    end

    def send_to(from_c, msg, task=nil)
      hash = {from: from_c.id, msg: msg}
      hash[:task] = task if task
      from_c.socket.send hash.to_json
    end

    def send_to_id(id, from, msg, task=nil)
      c = @clients[id]
      if c
        from = from.id if from.class==S3ocketServer::Client
        hash = {from: from, msg: msg}
        hash[:task] = task if task
        c.socket.send hash.to_json
      end
    end

    def send_to_all(from_c, msg, task=nil)
      hash = {from: from_c.id, msg: msg}
      hash[:task] = task if task
      json_msg = hash.to_json
      @clients.each_value{|c| c.socket.send json_msg unless c==from_c}
    end

  end
end