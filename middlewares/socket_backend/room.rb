module SocketBackend
  class Room


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

  end
end