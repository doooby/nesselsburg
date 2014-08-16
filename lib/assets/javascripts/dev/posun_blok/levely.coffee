PB.levely = {};

PB.nacti_level: (id, promenny) ->
    lev = PB.levely[id];
    if lev
        PB.svet = PB.Svet.vytvorZeZaznamu(lev, promenny)

PB.nacti_editor: ->
    pozice = []
    sirka = 16
    vyska = 8
    for i in [0..sirka*vyska-1]
        p = new PB.Pozice(i)
        p.blok = PB.Blok.vytvorTyp(1) if i==3
        p.blok = PB.Blok.vytvorTyp(2) if i==23
        pozice[i] = p
    PB.svet = new PB.Svet(sirka, pozice, true)


PB.levely['neco1'] = 'sirka=16|pozice=0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0;0;0;0;0;0;0,2;0;0;0,2;0,2;0;0,2;0;0,2;0,2;0;0;0;0;0,2;0;0;0;0,2;0;0;0;0,2;0;0,2;0,2;0;0;0,2;0;0;0;0;0;0;0;0;0;0;0;0,2;0,2;0;0;0;0;0;0;0,2;0;0;0,2;0,2;0,2;0,2;0,2;0;0,2;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0,2;0;0;0,2;0;0;0;0,2;0;0;0;0;0;0;0;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2;0,2'