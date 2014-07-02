class SelfChat.Chat
    constructor: (el) ->
        @el = $(el)
        @who = @el.attr('data-who')
        @el.find('.zapis').keydown(@onKeyDown)
        @connect()

    connect: ->
        uri = "ws://" + window.document.location.host + "/"
        console.log('připojuju na '+uri)
        @ws = new WebSocket(uri)

    onKeyDown:(ev) =>
#        console.log(ev.which)
        if ev.ctrlKey && ev.which==13
            ta = @el.find('.zapis')
            console.log(ta.val())
            ta.val('')
