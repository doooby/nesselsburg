class DAMA.Hra
    constructor: ->
        @hrac1 = new DAMA.Hrac(true, 'hráč')
        @hrac2 = new DAMA.Pocitac(false, 'počítač')
        @deska = new DAMA.Deska()
        @naTahu = @hrac1
    odehrejTah: (tah, hrac) ->
        return if @naTahu.hrac1!=hrac.hrac1
        @deska.provedTah(tah)
        J3O.draw()
        if tah.zere.length!=0 && !@deska.pozice[tah.na].dama
            hrac.po_skoku = true
            @konecTahu(hrac) if (@deska.mozneTahyHraceZ(hrac, tah.na).length==0 ||
                @deska.poziceHrace(!hrac.hrac1).length==0)
        else
            @konecTahu(hrac)
        if @deska.poziceHrace(@naTahu.hrac1).length==0
            duvod = @naTahu.jmeno+' nemá žádné kameny.'
            @ukonci(@druhyHrac(@naTahu), duvod)
            return
        @naTahu.jed()
    konecTahu: (hrac) ->
        hrac.po_skoku = false
        @naTahu = @druhyHrac(hrac)
    druhyHrac: (hrac) ->
        if hrac.hrac1 then @hrac2 else @hrac1
    ukonci: (hrac, duvod) ->
        VypisText('Konec hry, vyhrál '+ hrac.jmeno+'. '+duvod)

class DAMA.Hrac
    constructor: (@hrac1, @jmeno) ->
        @po_skoku = false
    jed: ->

class DAMA.Pocitac extends DAMA.Hrac
    vsechnyMozneTahy: ->
        vsechny_pozice = DAMA.hra.deska.poziceHrace(@hrac1)
        mozne = []
        for pozice in vsechny_pozice
            mozne = mozne.concat(DAMA.hra.deska.mozneTahyHraceZ(@, pozice))
        mozne
    jed: ->
        mozne = @vsechnyMozneTahy()
        tah = mozne[Math.floor(Math.random()*mozne.length)]
        DAMA.hra.deska.scene.add(tah.createTahMesh())
        J3O.draw()
        setTimeout( =>
            DAMA.hra.deska.scene.remove(tah.mesh)
            DAMA.hra.odehrejTah(tah, @)
        , 600)
