//= require ./konstanty
//= require ./svet
//= require ./pozice
//= require ./objekt
//= require_directory ./objekty
//= require ../../j3o.2/index
//= require_self
//= require ./gui_menu

/**
 * Created by doooby on 19.8.14.
 */

var platno = null;
var svet = null;


$(window).load(function(){
    //plátno
    platno = new J3O.Canvas(null,
        function (c) {
            //inicializace grafiky
            var pomer_platna = c.container.clientWidth / c.container.clientHeight;
            c.camera = new THREE.PerspectiveCamera(45, pomer_platna, 1, 100);
            c.camera.position.y = -45;
            c.camera.position.z = 40;
            c.camera.rotation.x = 45 * (Math.PI / 180);

            light = new THREE.PointLight(0xFFFFFF);
            light.position.set(-13, -15, 10);
            c.scene.add(light);







        },
        function (c) {

            //vykreslit
            c.redraw();

//            c.container.addEventListener('mousedown', function (e) {});
        }
    );

});