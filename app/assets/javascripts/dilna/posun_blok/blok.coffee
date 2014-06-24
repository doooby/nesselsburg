class PB.Blok
    constructor: ->
        @mesh = null
    typ: -> 0
    @vytvorTyp: (typ) ->
        switch typ
            when 0 then null
            when 1 then new PB.BlokHrac()
            when 2 then new PB.BlokBedna()
            when 3 then new PB.BlokKamen()
            else throw 'neznámý typ bloku '+typ

    vytvorMesh: ->
    zmenPozici: (pozice) ->
        @mesh.position = pozice.svet.positionBloku(pozice.index)
        @mesh.position.x += PB.SIRKA_BLOKU/2
        @mesh.position.y += PB.SIRKA_BLOKU/2
        @mesh.updateMatrix()
    znic: ->
        J3O.scene.remove(@mesh)

    jdePosunout: (blok, sila) ->
        sila>0

##############################################################################################

class PB.BlokHrac extends  PB.Blok
    typ: -> 1
    vytvorMesh: ->
        geom = new THREE.CylinderGeometry(PB.SIRKA_BLOKU/3, PB.SIRKA_BLOKU/3, PB.SIRKA_BLOKU/3, 11)
        mater = new THREE.MeshBasicMaterial({color: 0x1C94CC})
        @mesh = new THREE.Mesh(geom, mater)
        @mesh.matrixAutoUpdate = false
        @mesh.rotation.x = 1.57

class PB.BlokBedna extends PB.Blok
    typ: -> 2
    vytvorMesh: ->
        geom = new THREE.CubeGeometry(PB.SIRKA_BLOKU, PB.SIRKA_BLOKU, PB.SIRKA_BLOKU)
        txt = PB.tholder.get('bedna', @textura)
        mater = new THREE.MeshBasicMaterial({map: txt})
        @mesh = new THREE.Mesh(geom, mater)
        @mesh.matrixAutoUpdate = false
    textura: (url) ->
        new THREE.ImageUtils.loadTexture(url, new THREE.UVMapping(), ->
            J3O.draw(false, true)
        )

class PB.BlokKamen extends PB.Blok
    typ: -> 3
    vytvorMesh: ->
        geom = new THREE.CubeGeometry(PB.SIRKA_BLOKU, PB.SIRKA_BLOKU, PB.SIRKA_BLOKU)
        txt = PB.tholder.get('kamen', @textura)
        mater = new THREE.MeshBasicMaterial({map: txt})
        @mesh = new THREE.Mesh(geom, mater)
        @mesh.matrixAutoUpdate = false
    textura: (url) ->
        new THREE.ImageUtils.loadTexture(url, new THREE.UVMapping(), ->
            J3O.draw(false, true)
        )
    jdePosunout: -> false