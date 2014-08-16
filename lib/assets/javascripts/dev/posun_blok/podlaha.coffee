class PB.Podlaha
    constructor: ->
        @mesh = null
    typ: -> 0
    @vytvorTyp: (typ) ->
        switch typ
            when 0 then new PB.Podlaha()
            when 1 then new PB.PodlahaHlina()
            when 2 then new PB.PodlahaCil()
            else throw 'neznámý typ podlahy '+typ

    vytvorMesh: ->
        geom = new THREE.PlaneGeometry(PB.SIRKA_BLOKU, PB.SIRKA_BLOKU)
        mater = new THREE.MeshBasicMaterial({color: 0x303030})
        @mesh = new THREE.Mesh(geom, mater)
        @mesh.matrixAutoUpdate = false
    zmenPozici: (pozice) ->
        @mesh.position = pozice.svet.positionBloku(pozice.index)
        @mesh.position.x += PB.SIRKA_BLOKU/2
        @mesh.position.y += PB.SIRKA_BLOKU/2
        @mesh.position.z -= 0.2
        @mesh.updateMatrix()
    textura: (url) ->
        new THREE.ImageUtils.loadTexture(url, new THREE.UVMapping(), -> J3O.draw(false, true))
    znic: ->
        J3O.scene.remove(@mesh)

    jdeVsunout: (blok, sila) ->
        true
    interakceSBlokem: (blok, pozice) ->
        return unless @typ()==0 && blok.typ()==1
        alert('padáš')


##########################################################################################################

class PB.PodlahaHlina extends PB.Podlaha
    typ: -> 1
    vytvorMesh: ->
        geom = new THREE.PlaneGeometry(PB.SIRKA_BLOKU, PB.SIRKA_BLOKU)
        txt = PB.tholder.get('hlina', @textura)
        mater = new THREE.MeshBasicMaterial({map: txt})
        @mesh = new THREE.Mesh(geom, mater)
        @mesh.matrixAutoUpdate = false

class PB.PodlahaCil extends PB.Podlaha
    typ: -> 2
    vytvorMesh: ->
        geom = new THREE.PlaneGeometry(PB.SIRKA_BLOKU, PB.SIRKA_BLOKU)
        txt = PB.tholder.get('cil', @textura)
        mater = new THREE.MeshBasicMaterial({map: txt})
        @mesh = new THREE.Mesh(geom, mater)
        @mesh.matrixAutoUpdate = false
    interakceSBlokem: (blok, pozice) ->
        if blok.typ()==1
            alert('cil')