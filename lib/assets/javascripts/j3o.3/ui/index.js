//= require_self
//= require_directory

/**
 * Created by doooby on 18.10.14.
 */

Object.defineProperty(J3O, 'UI', {value: {}});

Object.defineProperty(J3O.UI, 'attachToCanvas', {value: function(canvas) {
    Object.defineProperty(canvas, 'ui', {value: {}});

    Object.defineProperty(canvas.ui, 'cameraMoved', {value: function(){

    }});







//    ui.cameraMoved = function(){
//        var projector;
//        _z_position = _canvas_object.camera.position.z - _canvas_object.camera.near;
//        projector = new THREE.Projector();
//        _vmin = projector.pickingRay(new THREE.Vector3(-1, 1, 0), _canvas_object.camera).ray.vectorAtZ(_z_position);
//        _vmax = projector.pickingRay(new THREE.Vector3(1, -1, 0), _canvas_object.camera).ray.vectorAtZ(_z_position);
//    };

    canvas.ui.cameraMoved();
}});