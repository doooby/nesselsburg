/**
 * Created by doooby on 6.4.15.
 */

GAME.addStruct('Stone', function () {
    return {
        mater0: new THREE.MeshBasicMaterial({color: 0xaaaaaa, side: THREE.DoubleSide}),
        mater1: new THREE.MeshBasicMaterial({color: 0xff5700, side: THREE.DoubleSide}),
        mater2: new THREE.MeshBasicMaterial({color: 0x004de9, side: THREE.DoubleSide}),
        create: function (mater) {
            var geom = new THREE.CylinderGeometry(GAME_DATA.stone_size, GAME_DATA.stone_size, 5, 5);
            var mesh = new THREE.Mesh(geom, mater);
            mesh.__ = {
                position: null,
                player: null,
                moveTo: function (p) {
                    this.position = p;
                    mesh.position.copy(GAME.Board.vectorOfPosition(p.__.index));
                    mesh.rotation.y = Math.PI * Math.random();
                    mesh.updateMatrix();
                }
            };
            mesh.rotation.x = Math.PI / 2;
            return mesh;
        }
    };
});