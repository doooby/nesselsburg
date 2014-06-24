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
            when 2 then new PB.PodlahaCil()
            else throw 'neznámý typ podlahy '+typ
    jdeVsunout: (blok, sila) ->
        true
    interakceSBlokem: (pozice) ->


class PB.PodlahaHlina extends PB.Podlaha
    vytvorMaterial: ->
#        txt = PB.PodlahaHlina.vem_texturu()
#        new THREE.MeshBasicMaterial({map: txt, side: THREE.DoubleSide})
        new THREE.MeshBasicMaterial({color: 0x724A16})
    typ: -> 1
#    @vem_texturu: ->
#        return PB.PodlahaHlina.TEXTURA unless PB.PodlahaHlina.TEXTURA==undefined
#        PB.PodlahaHlina.TEXTURA = new THREE.ImageUtils.loadTexture(PB.image_paths.hlina,
#            new THREE.UVMapping(), -> J3O.draw(false, true))

class PB.PodlahaCil extends PB.Podlaha
    vytvorMaterial: ->
#        txt = PB.PodlahaCil.vem_texturu()
#        new THREE.MeshBasicMaterial({map: txt, side: THREE.DoubleSide})
        new THREE.MeshBasicMaterial({color: 0xF3271D})
    typ: -> 2
#    @vem_texturu: ->
#        return PB.PodlahaCil.TEXTURA unless PB.PodlahaCil.TEXTURA==undefined
#        PB.PodlahaCil.TEXTURA = new THREE.ImageUtils.loadTexture(PB.image_paths.cil,
#            new THREE.UVMapping(), -> J3O.draw(false, true))