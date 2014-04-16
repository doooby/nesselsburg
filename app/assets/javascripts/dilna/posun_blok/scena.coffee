J3O.initScene = (rr, s) ->
    camera = new THREE.PerspectiveCamera(45,
            J3O.container.clientWidth/J3O.container.clientHeight,
        1, 100)
    J3O.camera = camera

J3O.initGeometry = (scene) ->
    pozice = []
    sirka = 16
    vyska = 8
    for i in [0..sirka*vyska-1]
        p = new PB.Pozice(i)
        p.blok = PB.Blok.vytvorTyp(1) if i==3
        p.blok = PB.Blok.vytvorTyp(2) if i==23
        pozice[i] = p
    PB.svet = new PB.Svet(sirka, pozice, true)

J3O.initUI = (scene) ->
    rot_point = (Math.PI/180)*3



    J3O.container.addEventListener('mousedown', (e) ->
        p = PB.svet.getPoziceKliknuti(e)
        return if p==null
        p.podlaha.znic()
        typ = parseInt(document.getElementById('podlaha').value)
        p.podlaha = new PB.Podlaha.vytvorTyp(typ)
        p.podlaha.vytvorMesh(p.svet.verticesPodlahy(p.index))
        scene.add(p.podlaha.mesh)
        J3O.draw()
    )

    document.addEventListener('keydown', (e) ->
        txt = e.keyCode

        switch e.keyCode
            when 100 then J3O.camera.position.x-=2
            when 102 then J3O.camera.position.x+=2
            when 104 then J3O.camera.position.y+=2
            when 98 then J3O.camera.position.y-=2
            when 101 then J3O.camera.position.z-=2
            when 96 then J3O.camera.position.z+=2
            when 103 then J3O.camera.rotation.y+=rot_point
            when 105 then J3O.camera.rotation.y-=rot_point
            when 97 then J3O.camera.rotation.z+=rot_point
            when 99 then J3O.camera.rotation.z-=rot_point
            when 109 then J3O.camera.rotation.x-=rot_point
            when 107 then J3O.camera.rotation.x+=rot_point
            when 110 then J3O.defCameraPosition()

            when 83 then txt+="\n"+PB.svet.vypisDoZaznamu()

            when 37 then PB.posunHrace(PB.SMER_VLEVO)
            when 38 then PB.posunHrace(PB.SMER_NAHORU)
            when 39 then PB.posunHrace(PB.SMER_VPRAVO)
            when 40 then PB.posunHrace(PB.SMER_DOLU)


        VypisText(txt+"\npozice: "+J3O.camera.position.toArray()+
            "\nrotace: "+J3O.camera.rotation.toArray())
        J3O.draw()
    )

PB.posunHrace = (smer) ->
    for ph, i in PB.svet.pozice_hrace
        p = PB.svet.getPozice(ph.index, smer)
        continue if p==null
        continue unless p.vsun(ph.blok, smer, 1)
        ph.blok = null
        PB.svet.pozice_hrace[i] = p

J3O.defCameraPosition = (svet) ->
    J3O.camera.position.set(svet.sirka*PB.SIRKA_BLOKU/2, svet.vyska*PB.SIRKA_BLOKU/2, 80)
    J3O.camera.rotation.set(0,0,0)

