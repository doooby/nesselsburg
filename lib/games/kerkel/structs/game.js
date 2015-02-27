/**
 * Created by doooby on 24.2.15.
 */

J3O.struct('game', function (app) {
    var current = null;

    Object.defineProperty(this.object, 'current', {get: function(){return current;}});

    this.method('startGameplay', function (socket, as_player) {
        if (current) throw 'Není ukončená hra, nelze začít novou!';

        var i;
        current = create_gameplay(as_player);

        stones = [];
        for (i=10; i<15; i+=1) stones.push(create_stone(0, i));
        for (i=0; i<5; i+=1) if (i!=2) {
            stones.push(create_stone(1, i, (as_player===1 ? current : null)));
        }
        for (i=20; i<25; i+=1) if (i!=22) {
            stones.push(create_stone(2, i, (as_player===2 ? current : null)));
        }

        J3O.board.removeAllStones();
        J3O.board.layDownStones(stones);
        canvas.redraw();
    });

    this.method('fatal', function () {
        J3O.board.removeAllStones();
        current = null;
    });

    // --------------------------------------------------------------------
    var create_gameplay = function (as_player){
        var on_turn = as_player===1;
        return Object.create(null, {
            player: {value: as_player},
            on_turn: {get: function(){return on_turn;}},
            moveStone: {value: function (from_index, to_index) {
                on_turn = false;
                J3O.board.moveStone(from_index, to_index);
                J3O.socket_interface.sendMove(from_index, to_index);
                // pokud protivník nemá kameny, vyhrál jsem
            }},
            opponentMoved: {value: function (from_index, to_index) {
                J3O.board.moveStone(from_index, to_index);
                //pokud já nic nemám, vyhrál protivník
                //pokud mám tah do cíle, vhrál jsem já
                on_turn = true;
            }}
        });
    };

    function create_stone(player, i_position, game) {
        var color;
        switch (player) {
            case 1: color = 0xff5700; break;
            case 2: color = 0x004de9; break;
            default: color = 0xaaaaaa;
        }
        var geom = new THREE.CylinderGeometry(app.stone_size, app.stone_size, 5, 5);
        var mater = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide});
        var mesh = new THREE.Mesh(geom, mater);
        mesh.model = {
            player: player,
            start_position: i_position,
            game: game,
            movedTo: function (i) {mesh.position.copy(J3O.board.vectorOfPositionIndex(i));},
            rotate: function () {mesh.rotation.y = Math.PI * Math.random();}
        };
        mesh.model.movedTo(i_position);
        mesh.model.rotate();
        mesh.rotation.x = Math.PI / 2;
        return mesh;
    }

});