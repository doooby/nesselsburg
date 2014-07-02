class S3ocket.Client
    constructor: (uri, on_ready_clb) ->
        @id = null
        @ws = new WebSocket(uri)
        @ws.onmessage = (message) =>
            data = JSON.parse(message.data)
            yr = data['yr']
            if yr && yr!=''
                switch data['yr']
                    when 'who?' # authorization request
                        @sendAuthorization()
                    when 'n'    # auth failed
                        @onAuthFailed()
                    else        # authorized by id
                        @id = data['yr']
                        @onAuthSuccess()
            else if @id
                msg = data[@id]
                @onMessage(msg) if msg
        @waitForConnection(on_ready_clb)
    waitForConnection: (clb) ->
        if @ws.readyState==1
            clb()
        else
            setTimeout(=>
                @waitForConnection(clb)
            , 300)
    sendAuthorization: ->
        auth_hash = @getAuthHash() if @getAuthHash
        @ws.send(JSON.stringify({iam:auth_hash})) if @ws.readyState==1 && auth_hash
    onAuthSuccess: ->
    onAuthFailed: ->
    onMessage: (msg) ->
    send: (data, to) ->
        return unless @id
        hash = {to: to}
        hash[@id] = data
        @ws.send(JSON.stringify(hash)) if @ws.readyState==1