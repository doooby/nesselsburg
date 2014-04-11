class DAMA.Hra
    constructor: ->
        @naTahuHrac1 = true
        @hrac1 = new DAMA.Hrac(true, 'hráč')
        @hrac2 = new DAMA.Pocitac(false, 'počítač')
        @deska = new DAMA.Deska()
    odehrejTah: (tah, hrac) ->
        return if @naTahuHrac1!=hrac.hrac1
        @deska.provedTah(tah)
        J3O.draw()
        pozice = @deska.poziceHrace(hrac.hrac1)
        if pozice.length==0
            duvod = hrac.jmeno+' nemá žádné možné kameny.'
            @ukonci(hrac.hrac1, duvod)
            return
#        @naTahuHrac1 = !hrac.hrac1
#        if @naTahuHrac1
#            @hrac1.jed()
#        else
#            @hrac2.jed()
    ukonci: (vitez_je_hrac1, duvod) ->
        vitez = if vitez_je_hrac1 then @hrac1 else @hrac2
        text = 'Konec hry, vyhrál '+ vitez.jmeno+'. '+duvod
        VypisText(text)

class DAMA.Hrac
    constructor: (@hrac1, @jmeno) ->
    jed: ->

class DAMA.Pocitac extends DAMA.Hrac
    vsechnyMozneTahy: ->
        vsechny_pozice = DAMA.hra.deska.poziceHrace(@hrac1)
        mozne = []
        for pozice in vsechny_pozice
            mozne = mozne.concat(DAMA.hra.deska.mozneTahyHraceZ(@hrac1, pozice))
        mozne
    jed: ->
        mozne = @vsechnyMozneTahy()
        tah = mozne[Math.floor(Math.random()*mozne.length)]
        DAMA.hra.odehrejTah(tah, @)