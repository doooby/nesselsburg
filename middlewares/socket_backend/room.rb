module SocketBackend
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

    def on_client_enter(client)
      client.set_id self, take_client_id
      @clients[client.id] = client
    end

    def on_client_leave(client)
      @clients.delete client.id
    end

    def on_internal_msg(client, msg)

    end

    def send_to_all(from_c, msg)
      @clients.each_value do |c|
        next if c==from_c
        json_msg = {c.id => msg}.to_json
        c.socket.send json_msg
      end
    end

    def send_to_id(id, msg)
      c = @clients[id]
      if c
        json_msg = {c.id => msg}.to_json
        c.socket.send json_msg
      end
    end

  end
end