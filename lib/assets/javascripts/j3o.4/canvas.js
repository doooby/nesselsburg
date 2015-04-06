///**
// * Created by doooby on 21.3.15.
// */
//
//J3O.define('createCanvas', function(opts, main_camera_definition){
//    var canvas = {};
//
//    if (typeof opts !== 'object') opts = {};
//    if (typeof opts['container_id'] !== 'string') opts['container_id'] = 'game_container';
//    if (typeof opts['clear_color'] !== 'number') opts['clear_color'] = 0x4364A2;
//
//    Object.defineProperty(canvas, 'container', {value: document.getElementById(opts['container_id'])});
//
//    Object.defineProperty(canvas, 'renderer', {value: new THREE.WebGLRenderer()});
//
//    Object.defineProperty(canvas, 'scene', {value: new THREE.Scene()});
//
//    Object.defineProperty(canvas, 'main_camera', {value: null, writable: true});
//
//    Object.defineProperty(canvas, 'width', {get: function(){
//        return canvas.container.clientWidth;
//    }});
//
//    Object.defineProperty(canvas, 'height', {get: function(){
//        return canvas.container.clientHeight;
//    }});
//
//    Object.defineProperty(canvas, 'redraw', {value: function(){
//        canvas.renderer.render(canvas.scene, canvas.main_camera);
//    }});
//
//    canvas.main_camera = main_camera_definition.call(canvas);
//    canvas.renderer.setClearColor(opts['clear_color']);
//    canvas.renderer.setSize(canvas.width, canvas.height);
//    container.appendChild(canvas.renderer.domElement);
//
//    return canvas;
//});