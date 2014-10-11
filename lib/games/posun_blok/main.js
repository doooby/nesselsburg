//= require ./konstanty
//= require ./svet
//= require ./pozice
//= require ./objekt
//= require ./hra
//= require_directory ./objekty
//= require j3o.2
//= require games_data
//= require ./gui_menu
//= require ./gui_editor
//= require_self

/**
 * Created by doooby on 19.8.14.
 */
$(window).load(function(){

    //plátno
    new J3O.Canvas(null,
        function (c) {
            platno = c;

            //inicializace grafiky
            var pomer_platna = c.container.clientWidth / c.container.clientHeight;
            c.camera = new THREE.PerspectiveCamera(45, pomer_platna, 1, 100);
            c.camera.up = new THREE.Vector3(0, 0, 1);

//            light = new THREE.PointLight(0xFFFFFF);
//            light.position.set(-13, -15, 10);
//            c.scene.add(light);

        },
        function (c) {

            smerovky = Objekt.Smerovky.new(5);
            smerovky.pridejNaScenu(c.scene, new THREE.Vector3(0 ,0 , 0));

            //vykreslit
            GUI.kameraNadStred();
            GUI.zobrazNabidku('hlavni_menu');

            GUI.nahrejTentoSvet('kkk');
        }
    );



});