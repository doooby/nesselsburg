//= require_self
//= require j3o.1
//= require_directory

var PB = {};

window.onload = function(){
    PB.SIRKA_BLOKU = 4;

    PB.SMER_NAHORU = 0;
    PB.SMER_VPRAVO = 1;
    PB.SMER_DOLU = 2;
    PB.SMER_VLEVO = 3;

    PB.tholder = new J3O.TextureHolder({'prefix':'games/posun_blok','suffix':'.bmp'});

    J3O.prepareDevice();
    J3O.draw();

};