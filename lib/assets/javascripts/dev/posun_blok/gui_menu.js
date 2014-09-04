/**
 * Created by doooby on 3.9.14.
 */

var GUI;
GUI = (function () {
    var proto;
    var editor_on_click, editor_vybrana_p, editor_vyber_oznaceni;

    proto = {};

    Object.defineProperty(proto, 'generujSvet', {enumerable: true,
        value: function () {
            // !!! zrušit předchozí svět !!!
            var i, sirka, vyska, pozice, pozic;
            sirka = parseInt($('#sirka').val());
            vyska = parseInt($('#vyska').val());
            pozic = sirka * vyska;
            pozice = [];
            for (i = 0; i < pozic; i += 1) pozice.push(Pozice.new(i, [11]));
            svet = Svet.new(pozice, sirka);
            svet.initObjekty(platno.scene);
            platno.redraw();
        }
    });

    Object.defineProperty(proto, 'zapniEditor', {enumerable: true,
        value: function () {
            if (!svet) return;
            $(platno.container).on('click', editor_on_click);
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////
    ///    interkace myší


    Object.defineProperty(proto, 'pozicePodleMysi', {enumerable: true,
        value: function (e) {
            var rayc, v, x, y;
            rayc = THREE.Ray.pickingRay(platno, e);
            v = rayc.ray.vectorAtZ(0);
            v.x += SIRKA_BLOKU/2;
            v.y += SIRKA_BLOKU/2;
            x = v.x/SIRKA_BLOKU;
            y = v.y/SIRKA_BLOKU;
            if (x<0 || x>svet.sirka || y<0 || y>svet.sirka) return null;
            return svet.pozice[Math.floor(y)*svet.sirka + Math.floor(x)];
        }
    });

    editor_on_click = function (e) {
        var pozice;
        pozice = GUI.pozicePodleMysi(e);
        if (pozice===null) return;
        if (!editor_vyber_oznaceni) {
            editor_vyber_oznaceni = Objekt.Oznaceni.new();
            editor_vyber_oznaceni.vytvorMesh();
            platno.scene.add(editor_vyber_oznaceni.mesh);
        }
        editor_vyber_oznaceni.posunNaV3(svet.poziceV3(pozice.index));
        platno.redraw();

        editor_vybrana_p = pozice;
    };

    Object.freeze(proto);
    return proto;
})();