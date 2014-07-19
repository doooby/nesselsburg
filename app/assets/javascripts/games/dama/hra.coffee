class DAMA.Hra
    constructor: (hrac1, hrac2) ->
        @hrac1 = hrac1.pridejDoHry(true, @)
        @hrac2 = hrac2.pridejDoHry(false, @)
        @naTahu = @hrac1
        @konec = false
        @naTahu.jed()

    odehrejTah: (tah, hrac) ->
        return if @naTahu.hrac1!=hrac.hrac1
        DAMA.deska.provedTah(tah)
        DAMA.platno.redraw()
        if tah.zere.length!=0 && !DAMA.deska.pozice[tah.na].dama
            hrac.po_skoku = true
            @konecTahu(hrac) if (DAMA.deska.mozneTahyHraceZ(hrac, tah.na).length==0 ||
                DAMA.deska.poziceHrace(!hrac.hrac1).length==0)
        else
            @konecTahu(hrac)
        if DAMA.deska.poziceHrace(@naTahu.hrac1).length==0
            duvod = @naTahu.jmeno+' nemá žádné kameny.'
            @ukonci(@druhyHrac(@naTahu), duvod)
        if @konec
            @nakonec(@) if @nakonec
        else
            @naTahu.jed()
    konecTahu: (hrac) ->
        hrac.po_skoku = false
        @naTahu = @druhyHrac(hrac)

    druhyHrac: (hrac) ->
        if hrac.hrac1 then @hrac2 else @hrac1
    ukonci: (hrac, duvod) ->
        @konec = true
        DAMA.vypis('Konec hry, vyhrál '+ hrac.jmeno+'. '+duvod)

class DAMA.Hrac
    constructor: (@jmeno) ->
        @po_skoku = false
    pridejDoHry: (@hrac1, @hra) ->
        @
    jed: ->

class DAMA.LokalniHrac extends DAMA.Hrac
    pridejDoHry: (@hrac1, @hra) ->
        @hra.lokalniHrac = @
        @

class DAMA.Pocitac extends DAMA.Hrac
    vsechnyMozneTahy: ->
        vsechny_pozice = DAMA.deska.poziceHrace(@hrac1)
        mozne = []
        for pozice in vsechny_pozice
            mozne = mozne.concat(DAMA.deska.mozneTahyHraceZ(@, pozice))
        mozne
    jed: ->
        mozne = @vsechnyMozneTahy()
        mozne_zrani = []
        for tah in mozne
            mozne_zrani.push(tah) if tah.zere.length>0
        tah = null
        if mozne_zrani.length>0
            tah = mozne_zrani[Math.floor(Math.random()*mozne_zrani.length)]
        else
            tah = mozne[Math.floor(Math.random()*mozne.length)]
#        DAMA.deska.scene.add(tah.createTahMesh())
#        DAMA.platno.redraw();
        setTimeout( =>
#            DAMA.deska.scene.remove(tah.mesh)
            @hra.odehrejTah(tah, @)
        , 500)
