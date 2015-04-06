/**
 * Created by doooby on 21.3.15.
 */

//J3O.define('utils', (function () {
//    var utils = {};
//
//    Object.defineProperty(utils, 'game_name', {value: null, writable: true});
//
//    Object.defineProperty(utils, 'setMouseRaycaster', {value: function (raycaster, canvas, camera, mouse_event) {
//        var x, y;
//        x = mouse_event.clientX - canvas.container.offsetLeft;
//        y = mouse_event.clientY - canvas.container.offsetTop;
//        x = 2 * (x / canvas.width) - 1;
//        y = -2 * (y / canvas.height) + 1;
//        raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
//        return raycaster;
//    }});
//
//    Object.defineProperty(utils, 'gameAssetUrl', {
//        value: function (name) {
//            return '/assets/'+utils.game_name+'/graphics/'+name;
//        }
//    });
//
//    return utils;
//}()));