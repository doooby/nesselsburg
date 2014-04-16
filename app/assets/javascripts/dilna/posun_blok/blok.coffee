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
        J3O.rr.deallocateObject(@mesh)
    typ: -> 0
    @vytvorTyp: (typ) ->
        switch typ
            when 0 then null
            when 1 then new PB.BlokHrac()
            when 2 then new PB.BlokBedna()
            else throw 'neznámý typ bloku'
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
        mater = new THREE.MeshBasicMaterial({color: 0xAF690C})
        @mesh = new THREE.Mesh(geom, mater)
        @mesh.matrixAutoUpdate = false
    typ: -> 2