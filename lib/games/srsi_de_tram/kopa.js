/**
 * Created by doooby on 30.11.14.
 */

var kopa = function () {
    var klass = {}, karty = [];

    Object.defineProperty(klass, 'karty', {value: karty});

    Object.defineProperty(klass, 'odhod', {value: function(karta){
        karty.push(karta);

        var m = karta.mesh;
        m.position = new THREE.Vector3(Math.random()*VYSKA_KARTY, Math.random()*VYSKA_KARTY, karty.length);
        m.position.add(STRED_KOPY);
        m.rotation.z = Math.random()*Math.PI;
        m.updateMatrix();
        platno.scene.add(m);
    }});

    Object.defineProperty(klass, 'pretocPakl', {value: function(){
    }});

    Object.freeze(klass);
    return klass;
};