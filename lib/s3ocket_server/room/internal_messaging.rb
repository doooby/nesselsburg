module S3ocketServer
  module Room::InternalMessaging

    def on_internal_msg(from_c, msg)
      case msg
        when 'get_everybody'
          hash = @clients.values.inject({}) do |h, c|
            h[c.id] = c.user
            h
          end
          from_c.send from_c.id => hash, 'from' => 's', 'for' => msg
      end
    end

  end
end