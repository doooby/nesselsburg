/**
 * Created by doooby on 30.8.14.
 */

Objekt.Oznaceni = (function () {
    var proto, klass, posun;
    proto = Object.create(Objekt.base);
    klass = {};
    posun = 0.05;

    ///////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti objektu

    Object.defineProperty(proto, 'vytvorMesh', {enumerable: true,
        value: function () {
            if (!this.mesh) {
                var sirka, vyska, geom, mater;
                sirka = (this.max_xy[0]-this.min_xy[0]+1)*SIRKA_BLOKU + posun*SIRKA_BLOKU;
                vyska = (this.max_xy[1]-this.min_xy[1]+1)*SIRKA_BLOKU + posun*SIRKA_BLOKU;
                geom = new THREE.CubeGeometry(sirka, vyska, SIRKA_BLOKU + posun*SIRKA_BLOKU);
                mater = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
                this.mesh = new THREE.Mesh(geom, mater);
                this.mesh.matrixAutoUpdate = false;
            }
        }
    });

    Object.defineProperty(proto, 'posunNaV3', {enumerable: true,
        value: function (v3) {
            if (this.mesh) {
                v3.x -= 2*posun;
                v3.y -= 2*posun;
                v3.z -= 2*posun;
                v3.z += SIRKA_BLOKU/2;
                this.mesh.position = v3;
                this.mesh.updateMatrix();
            }
        }
    });

    Object.defineProperty(proto, 'pridejNaScenu', {enumerable: true,
        value: function (pozice, svet, scene) {
            var min_v, max_v, v;
            this.vytvorMesh();
            max_v = svet.poziceV3(svet.poziceIndex(this.max_xy[0], this.max_xy[1]));
            min_v = svet.poziceV3(svet.poziceIndex(this.min_xy[0], this.min_xy[1]));
            v = new THREE.Vector3(
                (max_v.x-min_v.x)/2 +min_v.x,
                (max_v.y-min_v.y)/2 +min_v.y,
                0
            );
            this.posunNaV3(v);
            scene.add(this.mesh);
        }
    });

    Object.defineProperty(proto, 'proKazdouPozici', {enumerable: true,
        value: function (f) {
            var x, y;
            for (y=this.min_xy[1];y<=this.max_xy[1];y+=1) {
                for (x=this.min_xy[0];x<=this.max_xy[0];x+=1) {
                    f(x, y);
                }
            }
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti třídy

    Object.defineProperty(klass, 'new', {enumerable: true,
        value: function(z_do) {
            var new_object;
            new_object = Object.create(proto, {
                min_xy: {enumerable: true, value: z_do[0]},
                max_xy: {enumerable: true, value: z_do[1]}
            });
            return new_object;
        }
    });

    return Object.freeze(klass);
})();