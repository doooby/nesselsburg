class PB.Blok
    constructor: ->
        @mesh = null
    vytvorMesh: ->
    zmenPozici: (pozice) ->
        @mesh.position = pozice.svet.positionBloku(pozice.index)
        @mesh.position.x += PB.SIRKA_BLOKU/2
        @mesh.position.y += PB.SIRKA_BLOKU/2
        @mesh.updateMatrix()
    znic: ->
        J3O.scene.remove(@mesh)
    typ: -> 0
    @vytvorTyp: (typ) ->
        switch typ
            when 0 then null
            when 1 then new PB.BlokHrac()
            when 2 then new PB.BlokBedna()
            else throw 'neznámý typ bloku '+typ
    jdePosunout: (blok, sila) ->
        sila>0

class PB.BlokHrac extends  PB.Blok
    vytvorMesh: ->
        geom = new THREE.CylinderGeometry(PB.SIRKA_BLOKU/3, PB.SIRKA_BLOKU/3, PB.SIRKA_BLOKU/3, 11)
        mater = new THREE.MeshBasicMaterial({color: 0x1C94CC})
        @mesh = new THREE.Mesh(geom, mater)
        @mesh.matrixAutoUpdate = false
        @mesh.rotation.x = 1.57
    typ: -> 1

class PB.BlokBedna extends PB.Blok
    vytvorMesh: ->
        geom = new THREE.CubeGeometry(PB.SIRKA_BLOKU, PB.SIRKA_BLOKU, PB.SIRKA_BLOKU)
        txt = PB.BlokBedna.vem_texturu()
        mater = new THREE.MeshBasicMaterial({map: txt, side: THREE.DoubleSide})
        #mater = new THREE.MeshBasicMaterial({color: 0xAF690C})
        @mesh = new THREE.Mesh(geom, mater)
        @mesh.matrixAutoUpdate = false
    typ: -> 2
    @vem_texturu: ->
        return PB.BlokBedna.TEXTURA unless PB.BlokBedna.TEXTURA==undefined
        PB.BlokBedna.TEXTURA = new THREE.ImageUtils.loadTexture(PB.image_paths.bedna,
            new THREE.UVMapping(), -> J3O.draw(false, true))
