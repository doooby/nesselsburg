
class J3O.Canvas
    constructor: (opts, init_function) ->
        opts = {} unless opts

        conatiner_id = opts['container_id'] || '#game_container'
        @container = $(conatiner_id)[0]
        unless @container
            throw {err: 'Cannot load J3O.Canvas', msg: 'Container "'+conatiner_id+'" is not present.'}

        @rr = new THREE.WebGLRenderer()

        size = [@container.clientWidth, @container.clientHeight]
        @rr.setSize(size[0], size[1])

        clear_color = opts['clear_color'] || 0x4364A2
        @rr.setClearColor(clear_color)

        @scene = new THREE.Scene()
        init_function(@)
        unless @camera
            throw {err: 'Cannot load J3O.Canvas', msg: 'In constructor\'s init_function a camera must be created.'}

        @container.appendChild(@rr.domElement)

        @present = true

    drawInLoop: (on_move_clb) ->
        return unless @present
        on_move_clb() if on_move_clb
        @rr.render(@scene, @camera)
        requestAnimationFrame(=> @drawInLoop(on_move_clb))

    redraw: ->
        return unless @present
        @rr.render(@scene, @camera)
