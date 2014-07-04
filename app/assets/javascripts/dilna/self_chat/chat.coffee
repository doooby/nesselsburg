class SelfChat.Chat
    constructor: (el) ->
        @el = $(el)

        @klient = new S3ocket();
        @klient.getAuthHash = =>
            {login: @el.attr('data-who')}
        @klient.onAuthSuccess = =>
            @systemMsg('Připojeno jako '+@el.attr('data-who')+' (id '+@klient.id+')')
            @pripojeno = true
            @klient.sendMsg('s', 'get_all_authorized', (from, everybody) =>
                @everybody = everybody
            )
        @klient.onAuthFailed = =>
            @systemMsg('Jako '+@el.attr('data-who')+' se nepodařilo připojit')
            @pripojeno = false
        @klient.onClosed = =>
            @systemMsg('Odpojeno')
            @pripojeno = false

        @klient.setTaskCallback('chat', @chatMsg)

        @el.find('.zapis').keydown( (ev) =>
#            console.log(ev.which)
            if ev.ctrlKey && ev.which==13 && @pripojeno
                zapis = @el.find('.zapis')
                @chatMsg(@klient.id, zapis.val())
                @klient.sendMsg('a', zapis.val(), 'chat')
                zapis.val('')
        )

        @klient.waitForConnection( =>
            @klient.sendAuth()
        )

    systemMsg: (msg) ->
        vypis = @el.find('.vypis')
        vypis.append('<div class="sysmsg">'+msg+'</div>')

    chatMsg: (od_id, msg) =>
        if @everybody
            jmeno = @everybody[parseInt(od_id)]
            od_id = jmeno if jmeno
        vypis = @el.find('.vypis')
        vypis.append('<div class="msg"><span class="login">'+od_id+'</span>'+msg+'</div>')
