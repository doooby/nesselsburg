class SelfChat.Chat
    constructor: (el) ->
        @el = $(el)
        @klient = new S3ocket.Client("ws://" + window.document.location.host + "/", =>
            @klient.getAuthHash = => {login: @el.attr('data-who')}
            @klient.onAuthSuccess = =>
                vypis = @el.find('.vypis')
                msg = 'Připojeno: '+@el.attr('data-who')+' (id '+@klient.id+')'
                vypis.append('<div class="sysmsg">'+msg+'</div>')
                @pripojeno = true
            @klient.sendAuthorization()
            @klient.onMessage = @onMsg
            @el.find('.zapis').keydown(@onKeyDown)
        )

    onKeyDown:(ev) =>
#        console.log(ev.which)
        if ev.ctrlKey && ev.which==13 && @pripojeno
            zapis = @el.find('.zapis')
            @onMsg(zapis.val(), 'mě')
            @klient.send(zapis.val(), @el.find('#to_whom').val())
            zapis.val('')

    onMsg: (msg, from, for_req) =>
        switch from
            when 's'
                switch for_req
                    when 'get_everybody'
                        to_whom_sel = @el.find('#to_whom')
                        to_whom_sel.empty()
                        to_whom_sel.append($('<option></option>').attr('value', 's').text('server'))
                        to_whom_sel.append($('<option></option>').attr('value', 'a').text('všichni'))
                        for nekdo of msg
                            continue if nekdo==@klient.id
                            opt = $('<option></option>').attr('value', nekdo).text(msg[nekdo])
                            to_whom_sel.append(opt)
            else
                vypis = @el.find('.vypis')
                vypis.append('<div class="msg">'+'<span class="header">Od '+from+':</span>'+msg+'</div>')



