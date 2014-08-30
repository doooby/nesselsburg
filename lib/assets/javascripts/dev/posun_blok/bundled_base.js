//= require ./konstanty.js
//= require ./svet
//= require ./pozice
//= require ./objekt
//= require_directory ./objekty
//= require ../../j3o.2/index.js
//= require_self

/**
 * Created by doooby on 19.8.14.
 */

var platno = null;


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
//
            var i;
            pozice = [];
            for (i=0;i<30;i+=1) pozice.push(Pozice.new(i,[11]));
            svet = Svet.new(pozice, 6);

//            data_json = '{"sirka":2,"pozice":[[10],[10],[10],[11]]}';
//            svet = Svet.newZJson(data_json);


            svet.initObjekty(c.scene);

            //vykreslit
            c.redraw();

//            c.container.addEventListener('mousedown', function (e) {});
        }
    );

});