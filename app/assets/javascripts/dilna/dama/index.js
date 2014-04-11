//= require_self
//= require_directory

var DAMA = {};

window.onload = function(){

    DAMA.sirka_ctverce = 6.3;
    var puldesky = DAMA.sirka_ctverce*4;
    DAMA.offset_desky = new THREE.Vector3(-puldesky, -puldesky, 0);

    DAMA.hra = new DAMA.Hra();

    J3O.prepareDevice();
    J3O.draw();
};