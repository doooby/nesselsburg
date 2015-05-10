/**
 * Created by doooby on 6.4.15.
 */

GAME.addStruct('Board', function () {
    var struct = {
        positions: [],
        raycaster: new THREE.Raycaster(),
        v_mouse: new THREE.Vector2(),
        down_hit: null,
        up_hit: null,
        possible_steps: [],

        prepare: function () {
            if (create_board) {
                create_board();
                create_board = null;
            }
            else {
                this.positions.forEach(function (p) {
                    p.__.stones.forEach(function (s) { GAME.canvas.scene.remove(s); });
                    p.__.stones = [];
                });
            }
            this.positions.forEach(function (p) {
                var index = p.__.index;
                if (index<5 && index!=2) { add_stone(p, GAME.Stone.mater1); }
                else if (index>9 && index<15) { add_stone(p, GAME.Stone.mater0); }
                else if (index>19 && index!=22) { add_stone(p, GAME.Stone.mater2); }
            });
        },

        vectorOfPosition: function (index) {
            var v = GAME_DATA.board_top_left.clone();
            var xy = to_xy(index);
            v.x += (xy.x + .5) * GAME_DATA.position_total_size;
            v.y += (xy.y + .5) * GAME_DATA.position_total_size;
            return v;
        },

        moveOneStone: function (from, to) {
            var stone_to_move = from.__.stones.splice(0, 1)[0];
            var stone_there = to.__.stones[0];
            var canvas = GAME.canvas, scene = GAME.canvas.scene;
            if (!stone_there || stone_there.__.player===stone_to_move.__.player) {
                to.__.stones.push(stone_to_move);
            }
            else {
                to.__.stones.forEach(function (s) { scene.remove(s); });
                to.__.stones = [stone_to_move];
                if (!stone_there.__.player) {
                    var new_stone = add_stone(to, stone_to_move.material);
                    new_stone.__.player = stone_to_move.__.player;
                }
            }
            from.__.emplaceStones();
            to.__.emplaceStones();
            canvas.redraw();
        },

        possibleStepsFor: function (position) {
            var i = position.__.index;
            var xy = to_xy(i);
            if (i===2 || i===22) return [];
            var steps = [], new_xy;

            new_xy = {x: xy.x, y: xy.y};
            if (new_xy.x===4) {
                if (new_xy.y%2===0) new_xy.x = 0;
                else if(new_xy.y===1) new_xy.y = 3;
                else new_xy.y = 1;
                if (new_xy.y!==2) try_step(new_xy, steps);
            }
            else {
                new_xy.x += 1;
                try_step(new_xy, steps);
            }

            new_xy = {x: xy.x, y: xy.y};
            if (new_xy.x===0) {
                if (new_xy.y%2===0) new_xy.x = 4;
                else if(new_xy.y===1) new_xy.y = 3;
                else new_xy.y = 1;
                if (new_xy.y!==2) try_step(new_xy, steps);
            }
            else {
                new_xy.x -= 1;
                try_step(new_xy, steps);
            }

            new_xy = {x: xy.x, y: xy.y};
            if (new_xy.y===4) {
                if (new_xy.x%2===0) new_xy.y = 0;
                else if(new_xy.x===1) new_xy.x = 3;
                else new_xy.x = 1;
                if (new_xy.x!==2) try_step(new_xy, steps);
            }
            else {
                new_xy.y += 1;
                try_step(new_xy, steps);
            }

            new_xy = {x: xy.x, y: xy.y};
            if (new_xy.y===0) {
                if (new_xy.x%2===0) new_xy.y = 4;
                else if(new_xy.x===1) new_xy.x = 3;
                else new_xy.x = 1;
                if (new_xy.x!==2) try_step(new_xy, steps);
            }
            else {
                new_xy.y -= 1;
                try_step(new_xy, steps);
            }

            if (i%2===0) {
                new_xy = {x: xy.x+1, y: xy.y+1};
                if (new_xy.x!==5 && new_xy.y!==5) try_step(new_xy, steps);

                new_xy = {x: xy.x-1, y: xy.y+1};
                if (new_xy.x!==-1 && new_xy.y!==5) try_step(new_xy, steps);

                new_xy = {x: xy.x-1, y: xy.y-1};
                if (new_xy.x!==-1 && new_xy.y!==-1) try_step(new_xy, steps);

                new_xy = {x: xy.x+1, y: xy.y-1};
                if (new_xy.x!==5 && new_xy.y!==-1) try_step(new_xy, steps);
            }

            return steps;
        },

        getPositionsOfPlayer: function (player) {
            return _.filter(this.positions, function (p) {
                var stone = p.__.stones[0];
                return stone && stone.__.player==player;
            });
        },

        winningPositionForSide: function (side) {
            switch (side) {
                case 0:
                    return [
                        this.positions[1],
                        this.positions[3],
                        this.positions[6],
                        this.positions[7],
                        this.positions[8]
                    ];
                    break;
                case 1:
                    return [
                        this.positions[16],
                        this.positions[17],
                        this.positions[18],
                        this.positions[21],
                        this.positions[23]
                    ];
                    break;
                default: return [];
            }
        }

    };

    function to_index(x, y) {
        return y * 5 + x;
    }

    function to_xy(i) {
        return {x: (i % 5), y: Math.floor(i / 5)};
    }

    function add_stone(position, material) {
        var stone = GAME.Stone.create(material);
        stone.__.moveTo(position);
        position.__.stones.push(stone);
        GAME.canvas.scene.add(stone);
        return stone;
    }

    function create_board() {
        var p, i;
        for (i=0; i<25; i+=1) {
            p = GAME.Position.create(i);
            struct.positions.push(p);
            GAME.canvas.scene.add(p);
        }
        $(GAME.canvas.container).
            on('mousedown', mouse_down).
            on('mouseup', mouse_up).
            on('mouseout', function () {
                if (struct.possible_steps.length > 0) {
                    struct.possible_steps.forEach(function (step) {
                        step.material.uniforms.innerCol.value = new THREE.Color(0xffffff);
                    });
                    struct.possible_steps.length = 0;
                    GAME.canvas.redraw();
                }
            });
    }

    function get_mouse_hit(e) {
        struct.v_mouse.x = e.clientX - GAME.canvas.container.offsetLeft;
        struct.v_mouse.y = e.clientY - GAME.canvas.container.offsetTop;
        struct.v_mouse.x = 2 * (struct.v_mouse.x / GAME.canvas.width) - 1;
        struct.v_mouse.y = -2 * (struct.v_mouse.y / GAME.canvas.height) + 1;
        struct.raycaster.setFromCamera(struct.v_mouse, GAME.canvas.main_camera);
        var hit = struct.raycaster.intersectObjects(struct.positions)[0];
        if (hit) return hit.object;
    }

    function mouse_down(e) {
        var player, hit_stone;
//        e.preventDefault();

        player = GAME.current_game && GAME.current_game.on_turn;
        if (!player || !player.local) return;
        struct.down_hit = get_mouse_hit(e);
        hit_stone = struct.down_hit && struct.down_hit.__.stones[0];
        if (hit_stone && hit_stone.__.player==player) {
            struct.possible_steps = struct.possibleStepsFor(struct.down_hit);
            if (struct.possible_steps.length!==0) {
                struct.possible_steps.forEach(function (step) {
                    step.material.uniforms.innerCol.value = new THREE.Color(0xffff66);
                });
                GAME.canvas.redraw();
            }
        }
    }

    function mouse_up (e) {
        var valid_move;
//        e.preventDefault();

        if (struct.possible_steps.length>0) {
            struct.up_hit = get_mouse_hit(e);
            struct.possible_steps.forEach(function (step) {
                step.material.uniforms.innerCol.value = new THREE.Color(0xffffff);
                if (step===struct.up_hit) valid_move = true;
            });
            struct.possible_steps.length = 0;
            GAME.canvas.redraw();
        }

        if (struct.down_hit && valid_move) {
            if (GAME.current_game) {
                GAME.current_game.turn(struct.down_hit, struct.up_hit);
            }
        }

    }

    function try_step(xy, steps) {
        var index = to_index(xy.x, xy.y);
        if (index===2 || index===22) return;
        steps.push(struct.positions[index]);
    }

    return struct;
});