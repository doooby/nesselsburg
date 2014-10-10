/**
 * Created by doooby on 3.9.14.
 */

GUI = (function () {
    var proto;

    proto = {};

    Object.defineProperty(proto, 'znicSvet', {
        value: function () {
            if (svet) {
                svet.dispObjekty(platno.scene);
                svet = null;
                cam_stred = null;
                proto.posunKameruNadStred();
            }
        }
    });

    Object.defineProperty(proto, 'posunKameruNadStred', {
        value: function () {
            if (!cam_stred) cam_stred = new THREE.Vector3(0, 0, 0);
            platno.camera.position = new THREE.Vector3(0, 0, 50);
            platno.camera.lookAt(cam_stred);
            platno.redraw();
        }
    });

    Object.defineProperty(proto, 'zobrazNabidku', {
        value: function (kterou) {
            $('[data-ctrl]').css('display', 'none');
            $('[data-ctrl="'+kterou+'"]').css('display', 'block');

            proto.editor.zapnuty = kterou === 'editace_sveta';
            if (kterou=='sklad_svetu') proto.naplnVyberSvetu();
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
                    proto.posunKameruNadStred();
                });
            }
        }
    });

    Object.defineProperty(proto, 'ulozSvet', {
        value: function (klic) {
            if (svet && klic) {
                GamesData.saveData(klic, svet.jsonData);
            }
        }
    });


    return proto;
})();