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
                        var r = GAME_DATA.position_size * 0.4;
                        var angle_step = Math.PI*2 / this.stones.length;
                        var angle_start = Math.PI*2 * Math.random();
                        this.stones.forEach(function (stone, index) {
                            stone.position.x = stone.position.x + r * Math.cos(angle_start + angle_step*index);
                            stone.position.y = stone.position.y + r * Math.sin(angle_start + angle_step*index);
                            stone.updateMatrix();
                        });
                    }
                }
            };
            mesh.position.copy(GAME.Board.vectorOfPosition(index));
            return mesh;
        }
    };
});