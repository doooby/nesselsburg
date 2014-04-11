J3O.initScene = (scene) ->
    camera = new THREE.PerspectiveCamera(45,
        J3O.container.clientWidth/J3O.container.clientHeight,
        1, 100)
    camera.position.y = -45
    camera.position.z = 40
    camera.rotation.x = 45 * (Math.PI/180)
    J3O.camera = camera

    light = new THREE.PointLight(0xFFFFFF)
    light.position.set(-13, -15, 10)
    scene.add(light)


J3O.initGeometry = (scene) ->
    #deska
    d = new DAMA.Deska(scene)
    DAMA.hra.deska = d
    scene.add(d.mesh)
    #kameny na pozicích
    for i in [0..7]
        k = new DAMA.Kamen(i, true)
        d.pozice[i] = k
        scene.add(k.mesh)
    for i in [24..31]
        k = new DAMA.Kamen(i, false)
        d.pozice[i] = k
        scene.add(k.mesh)
    #--------dámy
#    for i in []
#        k = new DAMA.Kamen(i, true)
#        d.pozice[i] = k
#        scene.add(k.mesh)
#        k.zmenNaDamu(scene)
#        k.presunNa(i)
#    for i in []
#        k = new DAMA.Kamen(i, false)
#        d.pozice[i] = k
#        scene.add(k.mesh)
#        k.zmenNaDamu(scene)
#        k.presunNa(i)

J3O.initUI = (scene) ->
    hrac = DAMA.hra.hrac1
    mozne_tahy = []
    down_pozice = -1
    J3O.container.addEventListener('mousedown', (e) ->
        return unless DAMA.hra.naTahu.hrac1==hrac.hrac1
        down_pozice = DAMA.poziceByRay(THREE.Ray.pickingRay(e))
        return if down_pozice==-1
        mozne_tahy = DAMA.hra.deska.mozneTahyHraceZ(hrac, down_pozice)
        if mozne_tahy.length>0
#            vypis = []
#            vypis[i] = mozne_tahy[i].text() for i in [0..mozne_tahy.length-1]
#            console.log vypis
            scene.add(tah.createTahMesh()) for tah in mozne_tahy
            J3O.draw()
    )
    J3O.container.addEventListener('mouseup', (e) ->
        return if mozne_tahy.length==0
        vybrany = null
        up_pozice = DAMA.poziceByRay(THREE.Ray.pickingRay(e))
        for t in mozne_tahy
            scene.remove(t.mesh)
            vybrany = t if t.na==up_pozice
        mozne_tahy = []
        down_pozice = -1
        DAMA.hra.odehrejTah(vybrany, hrac) unless vybrany==null
        J3O.draw()
    )