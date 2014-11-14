/**
 * Created by doooby on 18.10.14.
 */

J3O.AxesPointers = function (size) {
    var mesh, geom, a, b, i, faces;
    a = size / 2;
    b = Math.sqrt(3) / 6 * size;
    geom = new THREE.Geometry();

    // X pointer
    geom.vertices.push(new THREE.Vector3(-5*a, -b, -a));
    geom.vertices.push(new THREE.Vector3(-5*a, 2*b, 0));
    geom.vertices.push(new THREE.Vector3(-5*a, -b, a));
    geom.vertices.push(new THREE.Vector3(0, 0, 0));
    geom.vertices.push(new THREE.Vector3(20*a, 0, 0));
    faces = [new THREE.Face3(3, 4, 4),
        new THREE.Face3(1, 2, 3),
        new THREE.Face3(2, 3, 0),
        new THREE.Face3(0, 1, 3)];
    for (i = 0; i<4; i++) {
        faces[i].materialIndex = 0;
        geom.faces.push(faces[i]);
    }

    // Y pointer
    geom.vertices.push(new THREE.Vector3(-a, -5*a, -b));
    geom.vertices.push(new THREE.Vector3(0, -5*a, 2*b));
    geom.vertices.push(new THREE.Vector3(a, -5*a, -b));
    geom.vertices.push(new THREE.Vector3(0, 0, 0));
    geom.vertices.push(new THREE.Vector3(0, 20*a, 0));
    faces = [new THREE.Face3(8, 9, 9),
        new THREE.Face3(6, 7, 8),
        new THREE.Face3(7, 8, 5),
        new THREE.Face3(5, 6, 8)];
    for (i = 0; i<4; i++) {
        faces[i].materialIndex = 1;
        geom.faces.push(faces[i]);
    }

    // Z pointer
    geom.vertices.push(new THREE.Vector3(-b, -a, -5*a));
    geom.vertices.push(new THREE.Vector3(2*b, 0, -5*a));
    geom.vertices.push(new THREE.Vector3(-b, a, -5*a));
    geom.vertices.push(new THREE.Vector3(0, 0, 0));
    geom.vertices.push(new THREE.Vector3(0, 0, 20*a));
    faces = [new THREE.Face3(13, 14, 14),
        new THREE.Face3(11, 12, 13),
        new THREE.Face3(12, 13, 10),
        new THREE.Face3(10, 11, 13)];
    for (i = 0; i<4; i++) {
        faces[i].materialIndex = 2;
        geom.faces.push(faces[i]);
    }


    mesh = new THREE.Mesh(geom, new THREE.MeshFaceMaterial(
        [
            new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true}),
            new THREE.MeshBasicMaterial({color: 0x00FF00, wireframe: true}),
            new THREE.MeshBasicMaterial({color: 0x0000FF, wireframe: true})
        ]
    ));
    mesh.matrixAutoUpdate = false;
    return mesh;
};