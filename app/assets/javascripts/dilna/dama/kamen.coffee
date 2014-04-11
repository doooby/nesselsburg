class DAMA.Kamen
    constructor: (pozice, @hrac1) ->
        @dama = false
        @vytvorMesh()
        @presunNa(pozice)
    vytvorMesh: ->
        vyska = if @dama then 4 else 1
        geom = new THREE.CylinderGeometry(2, 2, vyska, 11)
        barva = if @hrac1 then 0xFF5700 else 0x004DE9
        mater = new THREE.MeshLambertMaterial({color: barva})
        @mesh = new THREE.Mesh(geom, mater)
        @mesh.matrixAutoUpdate = false
        @mesh.rotation.x = 1.57
    presunNa: (pozice) ->
        @mesh.position = DAMA.worldPosition(pozice)
        @mesh.position.z = 0.5
        @mesh.updateMatrix()
    zmenNaDamu: (scene) ->
        return if @dama
        scene.remove(@mesh)
        @dama = true
        @vytvorMesh()
        scene.add(@mesh)
