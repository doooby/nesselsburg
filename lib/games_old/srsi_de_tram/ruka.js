/**
 * Created by doooby on 18.1.15.
 */

var Ruka = function () {
    var klass = {}, karty = [];

    Object.defineProperty(klass, 'pridejKarty', {value: function(arr_karet){
        var i;
        for (i=0; i< arr_karet.length; i+=1) {
            karty.push(arr_karet[i]);
        }
        klass.aktualizujZobrazeni();
    }});

    Object.defineProperty(klass, 'aktualizujZobrazeni', {value: function(){
        var i, k, na_kartu, pocatek;
        if (karty.length>0) {
            na_kartu = SIRKA_ZABERU*0.9 / karty.length;
            if (na_kartu>VYSKA_KARTY) na_kartu = VYSKA_KARTY;
            pocatek = STRED_HRACE.x - na_kartu*karty.length/2 + na_kartu/2;
            for (i=0; i< karty.length; i+=1) {
                k = karty[i];
                k.mesh.position.copy(STRED_HRACE);
                k.mesh.position.x = pocatek + (na_kartu * i);
                k.mesh.position.z -= 0.01 * i;
                k.mesh.rotation.z = Math.PI / 2;
                k.mesh.updateMatrix();
                platno.scene.add(k.mesh);
            }
        }
    }});

    return klass;

//    return function (local_player) {
//        function aktualizuj_ruku() {
//            var geometry = new THREE.PlaneGeometry(SIRKA_KARTY, VYSKA_KARTY);
//            mesh = new THREE.Mesh(geometry, Karty.pozadi_material);
//            mesh.position.copy(STRED_PAKLU);
//            mesh.rotation.z = Math.PI / 2;
//            platno.scene.add(mesh);
//        }
//    };
};