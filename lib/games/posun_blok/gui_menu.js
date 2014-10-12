/**
 * Created by doooby on 3.9.14.
 */

var GUI = (function () {
    var proto;

    proto = {};

    Object.defineProperty(proto, 'znicSvet', {
        value: function () {
            if (svet) {
                svet.dispObjekty(platno.scene);
                svet = null;
                proto.kameraNadStred();
            }
        }
    });

    Object.defineProperty(proto, 'kameraNadStred', {
        value: function (nevykreslit) {
            if (svet) {
                platno.camera.position = pozice_nad_svetem();
            }
            else {
                platno.camera.position = new THREE.Vector3(0, 0, 50);
            }
            platno.camera.lookAt(new THREE.Vector3(platno.camera.position.x, platno.camera.position.y, 0));
            if (!nevykreslit) platno.redraw();
        }
    });

    Object.defineProperty(proto, 'zobrazNabidku', {
        value: function (kterou) {
            switch (kterou) {
                case 'editace_sveta':
                    proto.editor.zapnuty = true;
                    break;
                case 'sklad_svetu':
                    proto.naplnVyberSvetu();
                    break;
                case 'hra':
                    if (svet) {
                        hra = Hra.new(svet);
                        hra.zacit();
                    }
                    else return;
                   break;
                default: // 'hlavni_menu'
                    proto.editor.zapnuty = false;
                    if (hra) {
                        hra.ukoncit();
                        hra = null;
                    }
                    GUI.kameraNadStred();
                    break;
            }

            $('[data-ctrl]').css('display', 'none');
            $('[data-ctrl="'+kterou+'"]').css('display', 'block');
        }
    });

    Object.defineProperty(proto, 'naplnVyberSvetu', {
        value: function () {
            var vyber_tag = $('#vyber_sveta');
            vyber_tag.find('option').remove();
            GamesData.findKeysLike('', function(arr){
                var i, klic;
                for (i=0;i<arr.length;i++) {
                    klic = arr[i];
                    vyber_tag.append($('<option>', {value: klic, html: klic}));
                }
            });
        }
    });

    Object.defineProperty(proto, 'nahrejTentoSvet', {
        value: function (klic) {
            if (klic) {
                GamesData.loadData(klic, function (svet_data) {
                    var new_svet;
                    new_svet = Svet.newZJsonDat(svet_data[0]);
                    proto.znicSvet();
                    svet = new_svet;
                    svet.initObjekty(platno.scene);
                    proto.kameraNadStred();
                });
            }
        }
    });

    Object.defineProperty(proto, 'ulozSvet', {
        value: function (klic) {
            if (svet && klic) {
                GamesData.saveData(klic, svet.jsonData, function () {
                    GUI.zobrazNabidku('hlavni_menu');
                });
            }
        }
    });

    function pozice_nad_svetem () {
        return new THREE.Vector3(
                (svet.sirka - 0.5) * SIRKA_BLOKU / 2,
                (svet.vyska - 0.5) * SIRKA_BLOKU / 2,
            50
        );
    }

    return proto;
})();

document.gui = GUI;