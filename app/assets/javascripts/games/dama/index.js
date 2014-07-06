//= require_self
//= require_directory

var DAMA = {};

DAMA.sirka_ctverce = 6.3;
var puldesky = DAMA.sirka_ctverce*4;
DAMA.offset_desky = new THREE.Vector3(-puldesky, -puldesky, 0);

DAMA.novaHra = function(opts) {
    if (DAMA.hra) DAMA.hra.destroy();

    hrac1 = new DAMA.Hrac(true, 'hráč');
    hrac2 = new DAMA.Pocitac(false, 'počítač');
    DAMA.hra = new DAMA.Hra(hrac1, hrac2);
};

$( document ).ready(function(){
    try {
        opts = {};
        DAMA.platno = new J3O.Canvas(opts, function (c) {

            var pomer_platna = c.container.clientWidth / c.container.clientHeight;
            c.camera = new THREE.PerspectiveCamera(45, pomer_platna, 1, 100);
            c.camera.position.y = -45;
            c.camera.position.z = 40;
            c.camera.rotation.x = 45 * (Math.PI / 180);

            light = new THREE.PointLight(0xFFFFFF);
            light.position.set(-13, -15, 10);
            c.scene.add(light);

            //deska
            DAMA.deska = new DAMA.Deska(c.scene);
        });
        DAMA.platno.redraw();
    }
    catch(err) {
        if (err['err']) DAMA.vypisInfo(err['err']+': '+err['msg'], 'err');
        else {
            DAMA.vypisInfo('Obecná vyjímka: '+err.message, 'err');
            console.log(err.stack);
        }
    }
});