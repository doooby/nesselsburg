//= require j3o.3
///= require three_js_lib/examples/js/controls/OrbitControls
//= require ./karty
//= require ./kopa
//= require ./pakl
//= require_self

/**
 * Created by doooby on 14.10.14.
 */

var platno;

var SIRKA_ZABERU = 0;
var VYSKA_ZABERU = 700;

var VYSKA_KARTY = 120;
var SIRKA_KARTY = 200;

var STRED_KOPY = new THREE.Vector3(550, 200, 0);
var STRED_PAKLU = new THREE.Vector3(350, 250, 0);

$(window).load(function(){

    J3O.data.setGameName('srsi_de_tram');

    //plátno
    J3O.createCanvas({
        camera: function() {
            var kamera;
            VYSKA_ZABERU = VYSKA_ZABERU / 2;
            SIRKA_ZABERU = (this.width / this.height) * VYSKA_ZABERU;
            kamera = new THREE.OrthographicCamera(SIRKA_ZABERU, -SIRKA_ZABERU, VYSKA_ZABERU, -VYSKA_ZABERU, 0, 100);
            kamera.up = new THREE.Vector3(0, -1, 0);
            kamera.position.set(SIRKA_ZABERU, VYSKA_ZABERU, 50);
            kamera.lookAt(new THREE.Vector3(SIRKA_ZABERU, VYSKA_ZABERU, 0));
            SIRKA_ZABERU = SIRKA_ZABERU * 2;
            VYSKA_ZABERU = VYSKA_ZABERU * 2;
            return kamera;
        }
    }, function() {
        platno = this;
//        (new THREE.OrbitControls(platno.camera)).addEventListener('change', platno.redraw);
//        platno.scene.add(J3O.AxesPointers(15));
        platno.redraw();

        //////////////// nahrávání /////////////////////
        var load_manager = J3O.LoadingManager(function () {
            console.log('manager load');
            Pakl.pridejNaScenu();
//
//
            platno.redraw();



            nova_hra();
        });
        Karty = Karty(load_manager);
        Pakl = Pakl();
        Kopa = Kopa();
        load_manager.start();
    });
});

function nova_hra () {

    Kopa.vyprazdni();
    Pakl.namichej(Karty.balik);

    var karty = Pakl.vem(6);
    for (i = 0; i< karty.length; i+=1) Kopa.odhod(karty[i]);

    platno.redraw();
}