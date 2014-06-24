class PB.Blok
    constructor: ->
        @mesh = null
    typ: -> 0

    vytvorMesh: ->
    @vem_texturu: (url) ->
        new THREE.ImageUtils.loadTexture(url, new THREE.UVMapping(), -> J3O.draw(false, true))
    zmenPozici: (pozice) ->
        @mesh.position = pozice.svet.positionBloku(pozice.index)
        @mesh.position.x += PB.SIRKA_BLOKU/2
        @mesh.position.y += PB.SIRKA_BLOKU/2
        @mesh.updateMatrix()
    znic: ->
        J3O.scene.remove(@mesh)

    @vytvorTyp: (typ) ->
        switch typ
            when 0 then null
            when 1 then new PB.BlokHrac()
            when 2 then new PB.BlokBedna()
            when 3 then new PB.BlokKamen()
            else throw 'neznámý typ bloku '+typ

    jdePosunout: (blok, sila) ->
        sila>0

##############################################################################################

class PB.BlokHrac extends  PB.Blok
    vytvorMesh: ->
        geom = new THREE.CylinderGeometry(PB.SIRKA_BLOKU/3, PB.SIRKA_BLOKU/3, PB.SIRKA_BLOKU/3, 11)
        mater = new THREE.MeshBasicMaterial({color: 0x1C94CC})
        @mesh = new THREE.Mesh(geom, mater)
        @mesh.matrixAutoUpdate = false
        @mesh.rotation.x = 1.57
    typ: -> 1

class PB.BlokBedna extends PB.Blok
    typ: -> 2
    vytvorMesh: ->
        geom = new THREE.CubeGeometry(PB.SIRKA_BLOKU, PB.SIRKA_BLOKU, PB.SIRKA_BLOKU)
        txt = PB.tholder.get('bedna', PB.Blok.vem_texturu)
        mater = new THREE.MeshBasicMaterial({map: txt})
        @mesh = new THREE.Mesh(geom, mater)
        @mesh.matrixAutoUpdate = false

class PB.BlokKamen extends PB.Blok
    typ: -> 3
    vytvorMesh: ->
        geom = new THREE.CubeGeometry(PB.SIRKA_BLOKU, PB.SIRKA_BLOKU, PB.SIRKA_BLOKU)
        txt = PB.tholder.get('kamen', PB.Blok.vem_texturu)
        mater = new THREE.MeshBasicMaterial({map: txt})
        @mesh = new THREE.Mesh(geom, mater)
        @mesh.matrixAutoUpdate = false
     jdePosunout: -> false