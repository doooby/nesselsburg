/**
 * Created by doooby on 6.4.15.
 */

Object.defineProperty(JNES, 'utils', {enumerable: true, value:
    (function () {
        var utils = {};

        Object.defineProperty(utils, 'log', {enumerable: true, value:
            function (text) {
                JNES.udalosti.vypis({text: text, class: 'log'});
            }
        });


        Object.defineProperty(utils, 'createCanvas', {enumerable: true, value:
            function(opts, main_camera_definition){
                var canvas = {};

                if (typeof opts !== 'object') opts = {};
                if (typeof opts['container_id'] !== 'string') opts['container_id'] = 'game_container';
                if (typeof opts['clear_color'] !== 'number') opts['clear_color'] = 0x4364A2;

                Object.defineProperty(canvas, 'container', {value: document.getElementById(opts['container_id'])});

                Object.defineProperty(canvas, 'renderer', {value: new THREE.WebGLRenderer()});

                Object.defineProperty(canvas, 'scene', {value: new THREE.Scene()});

                Object.defineProperty(canvas, 'main_camera', {value: null, writable: true});

                Object.defineProperty(canvas, 'width', {get: function(){
                    return canvas.container.clientWidth;
                }});

                Object.defineProperty(canvas, 'height', {get: function(){
                    return canvas.container.clientHeight;
                }});

                Object.defineProperty(canvas, 'redraw', {value: function(){
                    canvas.renderer.render(canvas.scene, canvas.main_camera);
                }});

                canvas.main_camera = main_camera_definition.call(canvas);
                canvas.renderer.setClearColor(opts['clear_color']);
                canvas.renderer.setSize(canvas.width, canvas.height);
                canvas.container.appendChild(canvas.renderer.domElement);

                return canvas;
            }
        });

        Object.defineProperty(utils, 'createLoadingManager', {enumerable: true, value:
            function(after_done) {
                var manager = {};
                var loaders = [];

                function add_loader(loader) {
                    loaders.push(loader);
                }

                function loader_done(loader) {
                    var i = loaders.indexOf(loader);
                    loaders.splice(i, 1);
                    if (loaders.length === 0) after_done();
                }

                Object.defineProperty(manager, 'enqueueImage', {value: function (url, on_load) {
                    var image = document.createElement('img');

                    function loader() {
                        image.src = url;
                    }

                    image.addEventListener('load', function () {
                        on_load(image);
                        loader_done(loader);
                    }, false);
                    add_loader(loader);
                }});

                Object.defineProperty(manager, 'start', {value: function () {
                    if (loaders.length == 0) after_done();
                    else for (var i = 0; i < loaders.length; i += 1) loaders[i]();
                }});

                Object.freeze(manager);
                return manager;
            }
        });

//    Object.defineProperty(utils, 'game_name', {value: null, writable: true});

//        Object.defineProperty(utils, 'setMouseRaycaster', {enumerable: true, value:
//            function (raycaster, canvas, camera, mouse_event) {
//                var x, y;
//                x = mouse_event.clientX - canvas.container.offsetLeft;
//                y = mouse_event.clientY - canvas.container.offsetTop;
//                x = 2 * (x / canvas.width) - 1;
//                y = -2 * (y / canvas.height) + 1;
//                raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
//                return raycaster;
//            }
//        });

//    Object.defineProperty(utils, 'gameAssetUrl', {
//        value: function (name) {
//            return '/assets/'+utils.game_name+'/graphics/'+name;
//        }
//    });

        return utils;
    }())
});