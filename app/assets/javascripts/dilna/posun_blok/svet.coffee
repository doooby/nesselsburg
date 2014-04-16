class PB.Svet
    constructor: (@sirka, @pozice, promenny) ->
        promenny = false if promenny==undefined
        @vyska = @pozice.length/@sirka
        mem_sirka = @sirka+1

        @vertices = []
        for y in [0..@vyska] then for x in [0..@sirka]
            @vertices.push(new THREE.Vector3(x*PB.SIRKA_BLOKU, y*PB.SIRKA_BLOKU, 0))

        geom = new THREE.Geometry()
        geom.vertices = @vertices
        mater = null
        if promenny
            mater = new THREE.MeshBasicMaterial({color: 0xD4D403, wireframe: true})
            for y in [0..@vyska-1] then for x in [0..@sirka-1]
                i = mem_sirka*y + x
                geom.faces.push(new THREE.Face3(i, i+1, i+mem_sirka))
                geom.faces.push(new THREE.Face3(i+mem_sirka, i+1, i+1+mem_sirka))
                p = @pozice[@sirka*y + x]
                p.svet = @
                p.podlaha.vytvorMesh(@verticesPodlahy(p.index))
                J3O.scene.add(p.podlaha.mesh)
                unless p.blok==null
                    p.blok.vytvorMesh()
                    p.blok.zmenPozici(p, @)
                    J3O.scene.add(p.blok.mesh)

        @mesh = new THREE.Mesh(geom, mater)
        @mesh.matrixAutoUpdate = false
        @mesh.updateMatrix()
        J3O.scene.add(@mesh)
        J3O.defCameraPosition(@)

        @pozice_hrace = []
        for p in @pozice
            @pozice_hrace.push(p) if p.blok!=null && p.blok.typ()==1
    @vytvorZeZaznamu: (text, promenny) ->
        #sirka=6|pozice=0;0;0;0;0;1;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0;0
        args = {}
        for a in text.split('|')
            split = a.split('=')
            args[split[0]] = split[1]
        #sirka
        sirka = args['sirka']
        #pozice
        pozice = []
        for p, i in args['pozice'].split(';')
            split = p.split(',')
            split.push(0) if split.legnth==0
            pozice.push(new PB.Pozice(i, parseInt(split[0]), parseInt(split[1])))
        #constructor
        svet = new PB.Svet(parseInt(sirka), pozice, promenny)
        p.svet = svet for p in pozice
        svet
    vypisDoZaznamu: ->
        ret = []
        #sirka
        ret.push('sirka='+@sirka)
        #pozice
        pozice = []
        for p in @pozice
            pt = ''+p.podlaha.typ()
            pt += ','+p.blok.typ() unless p.blok==null
            pozice.push(pt)
        ret.push('pozice='+pozice.join(';'))
        #vysledek
        ret.join('|')
    znic: ->
        return if @mesh==undefined
        J3O.scene.remove(@mesh)
        J3O.rr.deallocateObject(@mesh)
    verticesPodlahy: (index) ->
        i = index
        i += Math.floor(index/@sirka)
        [@vertices[i].clone(), @vertices[i+1].clone(),
            @vertices[i+@sirka+1].clone(), @vertices[i+2+@sirka].clone()
        ]
    positionBloku: (index) ->
        i = index
        i += Math.floor(index/@sirka)
        @vertices[i].clone()

    getPozice: (index, smer) ->
        if smer==undefined
            @pozice[index]
        else
            index2 = @getIPozice(index, smer)
            if index2==-1 then null else @pozice[index2]
    getIPozice: (index, smer) ->
        y = Math.floor(index/@sirka)
        x = index%@sirka
        switch smer
            when PB.SMER_NAHORU
                if y<@vyska-1 then index+@sirka else -1
            when PB.SMER_VPRAVO
                if x<@sirka-1 then index+1 else -1
            when PB.SMER_DOLU
                if y>0 then index-@sirka else -1
            when PB.SMER_VLEVO
                if x>0 then index-1 else -1
            when undefined then index
            else throw 'neznámý směr'
    getPoziceKliknuti: (e) ->
        v = THREE.Ray.pickingRay(e).ray.vectorAtZ(0)
        x = Math.floor(v.x/PB.SIRKA_BLOKU);
        y = Math.floor(v.y/PB.SIRKA_BLOKU);
        return null if x<0 || x>@sirka-1 || y<0 || y>@vyska-1
        @pozice[y*@sirka + x]
