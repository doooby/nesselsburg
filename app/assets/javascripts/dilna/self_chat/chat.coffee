class SelfChat.Chat
    constructor: (el) ->
        @el = $(el)
        @klient = new S3ocket.Client("ws://" + window.document.location.host + "/", =>
            @klient.getAuthHash = => {login: @el.attr('data-who')}
            @klient.onAuthSuccess = =>
                @systemMsg('Připojeno: '+@el.attr('data-who')+' (id '+@klient.id+')')
                @pripojeno = true
            @klient.sendAuthorization()
            @klient.onMessage = @onMsg
            @el.find('.zapis').keydown(@onKeyDown)
        )

    systemMsg: (msg) ->
        vypis = @el.find('.vypis')
        vypis.append('<div class="sysmsg">'+msg+'</div>')

    onKeyDown:(ev) =>
#        console.log(ev.which)
        if ev.ctrlKey && ev.which==13 && @pripojeno
            zapis = @el.find('.zapis')
            @onMsg('ode mě: '+zapis.val())
            @klient.send(zapis.val(), 'a')
            zapis.val('')

    onMsg: (msg) =>
        vypis = @el.find('.vypis')
        vypis.append('<div class="msg">'+msg+'</div>')
