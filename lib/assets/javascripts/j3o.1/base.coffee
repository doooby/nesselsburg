J3O.prepareDevice = (clear_color) ->
    J3O.container = document.getElementById('game_container')
    throw 'Container with id="game_container" is not present' if J3O.container==null

    throw 'J3O.initScene missing' unless isFunction(J3O.initScene)
    throw 'J3O.initGeometry missing' unless isFunction(J3O.initGeometry)
    throw 'J3O.initUI missing' unless isFunction(J3O.initUI)

    J3O.rr = new THREE.WebGLRenderer()
    J3O.rr.setSize(J3O.container.clientWidth, J3O.container.clientHeight)
    J3O.container.appendChild(J3O.rr.domElement)

    J3O.scene = new THREE.Scene()
    J3O.initScene(J3O.rr, J3O.scene)
    throw 'J3O.camera must be defined within J3O.initScene' if J3O.scene==undefined
    J3O.initGeometry(J3O.scene)
    J3O.initUI(J3O.scene)

    clear_color = 0x4364A2 if clear_color == undefined
    J3O.rr.setClearColor(clear_color)
    
    J3O.container.addEventListener('resize', ->
        J3O.rr.setSIze(J3O.container.clientWidth, J3O.container.clientHeight)
        J3O.camera.aspect = J3O.container.clientWidth / J3O.container.clientHeight
        J3O.camera.updateProjectionMatrix()
        J3O.onResize if isFunction(J3O.onResize)
    )

J3O.draw = (do_loop=false, load_signal=false) ->
    if load_signal
        return if J3O.first_draw
    else
        J3O.first_draw = false
    J3O.onFrameMove()
    J3O.rr.render(J3O.scene, J3O.camera)
    requestAnimationFrame(-> J3O.draw(true)) if do_loop

J3O.onFrameMove = ->
