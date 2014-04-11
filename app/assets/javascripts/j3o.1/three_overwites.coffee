THREE.Ray::vectorAtZ = (z) ->
    t = (z - @origin.z) / @direction.z
    new THREE.Vector3(
            @origin.x + t*@direction.x,
            @origin.y + t*@direction.y
    )

THREE.Ray.pickingRay = (mouse_ev) ->
    x = mouse_ev.clientX - J3O.container.offsetLeft
    y = mouse_ev.clientY - J3O.container.offsetTop
    x = 2*(x/J3O.container.clientWidth) - 1;
    y = -2*(y/J3O.container.clientHeight) + 1;
    dir = new THREE.Vector3(x, y, 0)
    new THREE.Projector().pickingRay(dir, J3O.camera)