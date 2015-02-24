//= require_self
//= require_directory
//= require ./structs
//= require ./data_store
//= require ./ui

/**
 * Created by doooby on 14.10.14.
 */

J3O = {};


Object.defineProperty(J3O, 'createCanvas', {value: function(opts, clbk) {
    var c, container;

    if (typeof opts !== 'object') opts = {};
    if (typeof opts['container_id'] !== 'string') opts['container_id'] = 'game_container';
    if (typeof opts['clear_color'] !== 'number') opts['clear_color'] = 0x4364A2;

    container = document.getElementById(opts['container_id']);
    if (!container) throw 'Container "' + opts['container_id'] + '" is not present.';

    c = {};
    Object.defineProperty(c, 'rr', {value: new THREE.WebGLRenderer()});
    Object.defineProperty(c, 'container_id', {value: opts['container_id']});
    Object.defineProperty(c, 'width', {value: container.clientWidth, writable: true});
    Object.defineProperty(c, 'height', {value: container.clientHeight, writable: true});
    Object.defineProperty(c, 'scene', {value: new THREE.Scene()});
    Object.defineProperty(c, 'camera', {value: (function(){
        var camera;
        if (typeof opts['camera']==='function') camera = opts['camera'].call(c);
        else camera = opts['camera'];
        if (!camera) throw 'Camera has not been given.';
        return camera;
    })(), writable: true});
    Object.defineProperty(c, 'redraw', {value: function () {
        c.rr.render(c.scene, c.camera);
    }});
    Object.defineProperty(c, 'setMouseRaycaster', {value: function (raycaster, me) {
        var x, y;
        x = me.clientX - container.offsetLeft;
        y = me.clientY - container.offsetTop;
        x = 2 * (x / container.clientWidth) - 1;
        y = -2 * (y / container.clientHeight) + 1;
        raycaster.setFromCamera(new THREE.Vector2(x, y), c.camera);
        return raycaster;
    }});

    c.rr.setClearColor(opts['clear_color']);
    c.rr.setSize(c.width, c.height);
    container.appendChild(c.rr.domElement);

    if (typeof clbk==='function') {
        clbk.call(c);
    }
    else throw 'After-canvas-creation callback has not been given.';
}});