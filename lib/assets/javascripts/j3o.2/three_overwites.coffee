THREE.Ray::vectorAtZ = (z) ->
    t = (z - @origin.z) / @direction.z
    new THREE.Vector3(
            @origin.x + t*@direction.x,
            @origin.y + t*@direction.y
    )

THREE.Ray.pickingRay = (canvas, mouse_ev) ->
    x = mouse_ev.clientX - canvas.container.offsetLeft
    y = mouse_ev.clientY - canvas.container.offsetTop
    x = 2*(x/canvas.container.clientWidth) - 1;
    y = -2*(y/canvas.container.clientHeight) + 1;
    dir = new THREE.Vector3(x, y, 0)
    new THREE.Projector().pickingRay(dir, canvas.camera)