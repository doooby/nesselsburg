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
        @mesh.position = DAMA.offset_desky
        @mesh.matrixAutoUpdate = false
        @mesh.updateMatrix()

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
        if (rada==7 && kamen.hrac1) || (rada==0 && !kamen.hrac1)
            kamen.zmenNaDamu(@scene)
        kamen.presunNa(tah.na)
        @pozice[tah.na] = kamen
    mozneTahyHraceZ: (hrac1, z) ->
        ret = []
        return ret if z==-1
        kz = @pozice[z]
        return ret if kz==null || kz.hrac1!=hrac1
        @vyhodnotDalsiTah(new DAMA.Tah(z, z), hrac1, kz.dama, ret)
        ret
    vyhodnotDalsiTah: (po_tahu, hrac1, dama, tahy, ze_smeru) ->
        multiskok = po_tahu.z!=po_tahu.na
        #0 = sv, 1 = jv, 2 = sz, 3 = jz
        for smer in [0..3]
            continue if smer==ze_smeru
            continue unless dama || (smer%2==0)==hrac1
            na = DAMA.krokSmerem(po_tahu.na, smer)
            continue if na==-1
            if dama
                diagonala = DAMA.diagonalaSmerem(na, smer)
                for p in diagonala
                    k = @pozice[p]
                    break unless k==null
                    tahy.push(new DAMA.Tah(po_tahu.z, p))
            else
                kamen_na = @pozice[na]
                if kamen_na==null
                    tahy.push(new DAMA.Tah(po_tahu.z, na)) unless multiskok
                else
                    continue if hrac1==kamen_na.hrac1
                    @zkusSkokKamene(DAMA.krokSmerem(na, smer), (skok_na) ->
                        dalsi_tah = new DAMA.Tah(po_tahu.z, skok_na,
                            po_tahu.zere.concat([na]))
                        tahy.push(dalsi_tah)
                        DAMA.hra.deska.vyhodnotDalsiTah(dalsi_tah, hrac1, false, tahy)
                    )
    zkusSkokKamene: (na, fce) ->
        fce(na) if na!=-1 && @pozice[na]==null

