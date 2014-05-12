class PB.Podlaha
    vytvorMesh: (vertices) ->
        v.z-=0.2 for v in vertices
        geom = new THREE.Geometry()
        geom.vertices = vertices
        geom.faces.push(new THREE.Face3(0, 1, 2))
        geom.faces.push(new THREE.Face3(2, 1, 3))
        @mesh = new THREE.Mesh(geom, @vytvorMaterial())
        @mesh.matrixAutoUpdate = false
        @mesh.updateMatrix()
    vytvorMaterial: ->
        new THREE.MeshBasicMaterial({color: 0x303030})
    znic: ->
        J3O.scene.remove(@mesh)
#        @mesh.dispose()
#        J3O.rr.deallocateObject(@mesh)
#        @mesh.deallocateObject()
    typ: -> 0
    @vytvorTyp: (typ) ->
        switch typ
            when 0 then new PB.Podlaha()
            when 1 then new PB.PodlahaHlina()
            else throw 'neznámý typ podlahy '+typ
    jdeVsunout: (blok, sila) ->
        true
    interakceSBlokem: (pozice) ->


class PB.PodlahaHlina extends PB.Podlaha
    vytvorMaterial: ->
        new THREE.MeshBasicMaterial({color: 0x724A16})
    typ: -> 1

