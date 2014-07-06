class DAMA.Tah
    constructor: (@z, @na, @zere, @zmizi) ->
        @zere = [] if @zere==undefined
        @zmizi = [] if @zmizi==undefined
    createTahMesh: ->
        geom = new THREE.CircleGeometry(1.3)
        mater = new THREE.MeshBasicMaterial({color: 0xB6FF6D})
        @mesh = new THREE.Mesh(geom, mater)
        @mesh.position = DAMA.worldPosition(@na)
        @mesh.position.z = 0.1
        @mesh.matrixAutoUpdate = false
        @mesh.updateMatrix()
        @mesh
    text: ->
        'z:'+@z+' na:'+@na+' zere: '+@zere
