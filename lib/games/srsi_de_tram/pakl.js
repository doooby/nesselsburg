/**
 * Created by doooby on 7.12.14.
 */

var Pakl = function () {
    var klass = {}, karty = [], mesh;


    Object.defineProperty(klass, 'vyprazdni', {value: function(){
        karty.length = 0;
    }});

    Object.defineProperty(klass, 'namichej', {value: function(balik_karet){
        var i, k, pocet_karet, zarazeno;

        this.vyprazdni();
        pocet_karet = balik_karet.length;

        for (i=0; i<pocet_karet; i+=1) {
            k = Math.floor(Math.random() * pocet_karet);
            zarazeno = false;
            while (!zarazeno) {
                if (!karty[k]) {
                    karty[k] = balik_karet[i];
                    zarazeno = true;
                }
                else {
                    k += 1;
                    if (k>=pocet_karet) k = 0;
                }
            }
        }
    }});

    Object.defineProperty(klass, 'vem', {value: function(kolik){
        if (karty.length<=kolik) {
            Kopa.pretocDoPaklu(karty);
            if (karty.length<kolik) throw 'Málo karet ke hře!'
        }
        return karty.splice(0, kolik);
    }});

    Object.defineProperty(klass, 'pridejNaScenu', {value: function () {
        var geometry = new THREE.PlaneGeometry(SIRKA_KARTY, VYSKA_KARTY);
        mesh = new THREE.Mesh(geometry, Karty.pozadi_material);
        mesh.position.copy(STRED_PAKLU);
        mesh.rotation.z = Math.PI / 2;
        platno.scene.add(mesh);
    }});

    return klass;
};