module S3ocketServer
  class Room

    include InternalMessaging

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

    def on_client_enter(client)
      client.set_id self, take_client_id
      @clients[client.id] = client
    end

    def on_client_leave(client)
      @clients.delete client.id
    end

    def send_to_all(from_c, msg)
      @clients.each_value do |c|
        next if c==from_c
        c.send c.id => msg, 'from' => from_c.id
      end
    end

    def send_to_ids(from_c, ids_arr, msg)
      ids_arr.each do |id|
        c = @clients[id.to_i]
        c.send c.id => msg, 'from' => from_c.id if c
      end
    end

  end
end
