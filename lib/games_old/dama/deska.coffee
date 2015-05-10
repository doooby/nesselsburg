class DAMA.Deska
    constructor: (@scene) ->
        @pozice = []
        geom = new THREE.Geometry()
        for y in [0..8] then for x in [0..8]
            geom.vertices.push(new THREE.Vector3(x*DAMA.sirka_ctverce,
                    y*DAMA.sirka_ctverce, 0))
            continue if y==8||x==8
            i = 9*y + x
            m = i%2
            f = new THREE.Face3(i, i+1, i+9)
            f.materialIndex = m
            geom.faces.push(f)
            f = new THREE.Face3(i+9, i+1, i+10)
            f.materialIndex = m
            geom.faces.push(f)
            pi = DAMA.poziceByCoords(x, y)
            @pozice[pi] = null if pi!=-1
        maters = [
            new THREE.MeshBasicMaterial({color: 0x000000}),
            new THREE.MeshBasicMaterial({color: 0xFFFFFF})
        ]
        @mesh =new THREE.Mesh(geom, new THREE.MeshFaceMaterial(maters))
        @mesh.position.copy(DAMA.offset_desky)
        @mesh.matrixAutoUpdate = false
        @mesh.updateMatrix()
        @scene.add(@mesh)

    rozlozKameny: ->
        for i in [0..7]
            k = new DAMA.Kamen(i, true)
            @pozice[i] = k
            @scene.add(k.mesh)
        for i in [24..31]
            k = new DAMA.Kamen(i, false)
            DAMA.deska.pozice[i] = k
            @scene.add(k.mesh)
    prycKameny: ->
        for i in [0..@pozice.length-1]
            p = @pozice[i]
            if p
                @scene.remove(p.mesh)
                @pozice[i] = null

    poziceHrace: (hrac1) ->
        ret = []
        for i in [0..@pozice.length-1]
            k = @pozice[i]
            ret.push(i) if k!=null && k.hrac1==hrac1
        ret
    provedTah: (tah) ->
        kamen = @pozice[tah.z]
        @pozice[tah.z] = null
        for p in tah.zere.concat(tah.zmizi)
            @scene.remove(@pozice[p].mesh)
            @pozice[p] = null
        rada = DAMA.getPoziceCoords(tah.na)[1]
        if !kamen.dama && ((rada==7 && kamen.hrac1) || (rada==0 && !kamen.hrac1))
            kamen.zmenNaDamu(@scene)
        kamen.presunNa(tah.na)
        @pozice[tah.na] = kamen
    mozneTahyHraceZ: (hrac, z) ->
        return [] if z==-1
        kz = @pozice[z]
        return [] unless kz && kz.hrac1==hrac.hrac1
        @vyhodnotTah(z, hrac, kz.dama)
    zkusSkokKamene: (na, fce) ->
        fce(na) if na!=-1 && @pozice[na]==null
    vyhodnotTah: (z, hrac, dama) ->
        tahy = []
        #0 = sv, 1 = jv, 2 = sz, 3 = jz
        for smer in [0..3]
            continue unless dama || (smer%2==0)==hrac.hrac1
            if dama
                po_skoku = hrac.po_skoku
                p = z
                zere = []
                while true
                    p = DAMA.krokSmerem(p, smer)
                    break if p==-1
                    k = @pozice[p]
                    if k==null
                        tahy.push(new DAMA.Tah(z, p, zere.slice(0))) unless po_skoku
                    else
                        break if k.hrac1==hrac.hrac1
                        zere.push(p)
                        p = DAMA.krokSmerem(p, smer)
                        break if p==-1
                        k = @pozice[p]
                        break unless k==null
                        po_skoku = false
                        tahy.push(new DAMA.Tah(z, p, zere.slice(0)))
            else
                na = DAMA.krokSmerem(z, smer)
                continue if na==-1
                kamen_na = @pozice[na]
                if kamen_na==null
                    tahy.push(new DAMA.Tah(z, na)) unless hrac.po_skoku
                else
                    @zkusSkokKamene(DAMA.krokSmerem(na, smer), (skok_na) ->
                        tahy.push(new DAMA.Tah(z, skok_na, [na]))
                    ) unless hrac.hrac1==kamen_na.hrac1
        tahy