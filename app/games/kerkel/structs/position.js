/**
 * Created by doooby on 6.4.15.
 */

GAME.addStruct('Position', function () {
    return {
        create: function (index) {
            var geom = new THREE.PlaneBufferGeometry(GAME_DATA.position_size, GAME_DATA.position_size);
            var radius=0.43, stroke=0.06, c_inner=0xffffff, c_stroke=0x000000;
            var mater = new THREE.ShaderMaterial({
                uniforms: {
                    radius: { type: "f", value: radius },
                    stroke: { type: "f", value: radius+stroke },
                    innerCol: { type: "c", value: new THREE.Color( c_inner ) },
                    strokeCol: { type: "c", value: new THREE.Color( c_stroke ) }
                },
                vertexShader: GAME.shaders['vs_circle'],
                fragmentShader: GAME.shaders['fs_filled_circle'],
                side: THREE.DoubleSide
            });
            var mesh = new THREE.Mesh(geom, mater);
            mesh.__ = {
                index: index,
                stones: [],
                emplaceStones: function () {
                    this.stones.forEach(function (stone) { stone.__.moveTo(mesh); });
                    if (this.stones.length > 1) {

                    }
                }
            };
            mesh.position.copy(GAME.Board.vectorOfPosition(index));
            return mesh;
        }
    };
});