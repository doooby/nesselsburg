class PB.Pozice
    constructor: (@index, podlaha_typ, blok_typ) ->
        podlaha_typ = 0 if podlaha_typ==undefined
        blok_typ = 0 if blok_typ==undefined
        @podlaha = PB.Podlaha.vytvorTyp(podlaha_typ)
        @blok = PB.Blok.vytvorTyp(blok_typ)
    vsun: (blok, smer, sila) ->
        if @podlaha.jdeVsunout(blok, sila) && (@blok==null || @blok.jdePosunout(blok, sila))
            unless @blok==null
                kam = @svet.getPozice(@index, smer)
                return false if kam==null || !kam.vsun(@blok, smer, sila-1)
            @blok = blok
            @blok.zmenPozici(@)
            @podlaha.interakceSBlokem(@)
            return true
        false





