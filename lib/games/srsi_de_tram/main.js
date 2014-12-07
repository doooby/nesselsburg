//= require j3o.3
///= require three_js_lib/examples/js/controls/OrbitControls
//= require ./karty
//= require ./kopa
//= require_self

/**
 * Created by doooby on 14.10.14.
 */

var platno;

var SIRKA_ZABERU = 0;
var VYSKA_ZABERU = 700;

var VYSKA_KARTY = 120;
var SIRKA_KARTY = 200;

var STRED_KOPY = new THREE.Vector3(400, 200, 0);

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
        platno.redraw();

        karty = karty();
        kopa = kopa();

//        (new THREE.OrbitControls(platno.camera)).addEventListener('change', platno.redraw);
//        platno.scene.add(J3O.AxesPointers(15));
//        platno.redraw();

        //////////////// nahrávání /////////////////////
        var manager = new THREE.LoadingManager();
        var loader = new THREE.ImageLoader(manager);
        manager.onProgress = function (item, loaded, total) {
            if (loaded===33) {
//                platno.scene.add(karty.balik[15].mesh);

                console.log('loaded');


                kopa.odhod(karty.balik[24]);
                kopa.odhod(karty.balik[25]);
                kopa.odhod(karty.balik[26]);
                kopa.odhod(karty.balik[27]);
                kopa.odhod(karty.balik[28]);
                kopa.odhod(karty.balik[29]);
                kopa.odhod(karty.balik[30]);


                platno.redraw();
            }
        };
        // balík karet
        for (i=0;i<karty.balik.length;i+=1) {
            (function(){
                var k, t;
                k = karty.balik[i];
                (loader).load(J3O.data.graphicsUrl(k.text+'.bmp'), function(img){
                    t = new THREE.Texture(img);
                    t.needsUpdate = true;
                    k.createMesh(t);
                });
            })();
        }


    });
});