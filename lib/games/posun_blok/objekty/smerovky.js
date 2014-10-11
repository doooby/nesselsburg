/**
 * Created by doooby on 27.9.14.
 */

Objekt.Smerovky = (function () {
    var proto, klass;
    proto = Object.create(Objekt.base);
    klass = {};


    ///////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti objektu

    Object.defineProperty(proto, 'vytvorMesh', {enumerable: true,
        value: function () {
            if (!this.mesh) {
                var geom, pulka, vyska_3;
                var i, faces;

                pulka = this.velikost/2;
                vyska_3 = Math.sqrt(3)/6*this.velikost;

                geom = new THREE.Geometry();
                // osa X
                geom.vertices.push(new THREE.Vector3(-5*pulka, -vyska_3, -pulka));
                geom.vertices.push(new THREE.Vector3(-5*pulka, 2*vyska_3, 0));
                geom.vertices.push(new THREE.Vector3(-5*pulka, -vyska_3, pulka));
                geom.vertices.push(new THREE.Vector3(0, 0, 0));
                geom.vertices.push(new THREE.Vector3(20*pulka, 0, 0));
                faces = [new THREE.Face3(3, 4, 4),
                    new THREE.Face3(1, 2, 3),
                    new THREE.Face3(2, 3, 0),
                    new THREE.Face3(0, 1, 3)];
                for (i = 0; i<4; i++) {
                    faces[i].materialIndex = 0;
                    geom.faces.push(faces[i]);
                }

                // osa Y
                geom.vertices.push(new THREE.Vector3(-pulka, -5*pulka, -vyska_3));
                geom.vertices.push(new THREE.Vector3(0, -5*pulka, 2*vyska_3));
                geom.vertices.push(new THREE.Vector3(pulka, -5*pulka, -vyska_3));
                geom.vertices.push(new THREE.Vector3(0, 0, 0));
                geom.vertices.push(new THREE.Vector3(0, 20*pulka, 0));
                faces = [new THREE.Face3(8, 9, 9),
                    new THREE.Face3(6, 7, 8),
                    new THREE.Face3(7, 8, 5),
                    new THREE.Face3(5, 6, 8)];
                for (i = 0; i<4; i++) {
                    faces[i].materialIndex = 1;
                    geom.faces.push(faces[i]);
                }

                // osa Z
                geom.vertices.push(new THREE.Vector3(-vyska_3, -pulka, -5*pulka));
                geom.vertices.push(new THREE.Vector3(2*vyska_3, 0, -5*pulka));
                geom.vertices.push(new THREE.Vector3(-vyska_3, pulka, -5*pulka));
                geom.vertices.push(new THREE.Vector3(0, 0, 0));
                geom.vertices.push(new THREE.Vector3(0, 0, 20*pulka));
                faces = [new THREE.Face3(13, 14, 14),
                    new THREE.Face3(11, 12, 13),
                    new THREE.Face3(12, 13, 10),
                    new THREE.Face3(10, 11, 13)];
                for (i = 0; i<4; i++) {
                    faces[i].materialIndex = 2;
                    geom.faces.push(faces[i]);
                }


                this.mesh = new THREE.Mesh(geom, new THREE.MeshFaceMaterial(
                    [
                        new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true}),
                        new THREE.MeshBasicMaterial({color: 0x00FF00, wireframe: true}),
                        new THREE.MeshBasicMaterial({color: 0x0000FF, wireframe: true})
                    ]
            ));
                this.mesh.matrixAutoUpdate = false;
            }
        }
    });

    Object.defineProperty(proto, 'posunNaV3', {enumerable: true,
        value: function (v3) {
            if (this.mesh) {
                this.mesh.position = v3;
                this.mesh.updateMatrix();
            }
        }
    });

    Object.defineProperty(proto, 'pridejNaScenu', {enumerable: true,
        value: function (scene, v) {
            this.vytvorMesh();
            this.posunNaV3(v);
            scene.add(this.mesh);
        }
    });

    /////////////////////////////////////////////////////////////////////////////////////////////////// vlastnosti třídy

    Object.defineProperty(klass, 'new', {enumerable: true,
        value: function(_velikost) {
            var new_object;
            new_object = Object.create(proto, {
                velikost: {enumerable: true, value: _velikost}
            });
            return new_object;
        }
    });

    return Object.freeze(klass);
})();