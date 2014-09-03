/**
 * Created by doooby on 3.9.14.
 */

function generujNovySvet() {
    // !!! zrušit předchozí svět !!!
    var i, sirka, vyska, pozice, pozic;
    sirka = parseInt($('#sirka').val());
    vyska = parseInt($('#vyska').val());
    pozic = sirka*vyska;
    pozice = [];
    for (i=0;i<pozic;i+=1) pozice.push(Pozice.new(i,[11]));
    svet = Svet.new(pozice, sirka);
    svet.initObjekty(platno.scene);
    platno.redraw();
}