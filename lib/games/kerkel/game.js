/**
 * Created by doooby on 24.2.15.
 */

J3O.structs('Game', function (app) {
    var struct = {};

    var gameplay_proto = (function () {
        var klass = {};
        Object.defineProperty(klass, 'stones', {value: null, writable: true});
        Object.defineProperty(klass, 'eachStone', {value: function (for_each) {
            for (var i=0; i<this.stones.length; i+=1) for_each(this.stones[i], i);
        }});
        return klass;
    }());

    function create_stone(color, i_position) {
        var geom = new THREE.CylinderGeometry(app.stone_size, app.stone_size, 5, 5);
        var mater = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide});
        var mesh = new THREE.Mesh(geom, mater);
        mesh.model = {
            position: i_position,
            moveTo: function (i) {mesh.position.copy(J3O.Board.vectorOfPositionIndex(i));},
            rotate: function () {mesh.rotation.y = Math.PI * Math.random();}
        };
        mesh.model.moveTo(i_position);
        mesh.model.rotate();
        mesh.rotation.x = Math.PI / 2;
        return mesh;
    }

    Object.defineProperty(struct, 'createGameplay', {value: function () {
        var i;
        var klass = Object.create(gameplay_proto);

        klass.stones = [];
        for (i=0; i<5; i+=1) if (i!=2) klass.stones.push(create_stone(0xff5700, i));
        for (i=10; i<15; i+=1) klass.stones.push(create_stone(0xaaaaaa, i));
        for (i=20; i<25; i+=1) if (i!=22) klass.stones.push(create_stone(0x004de9, i));


        return klass;
    }});

    Object.defineProperty(struct, 'prepareGameplay', {value: function (game) {
        J3O.Board.removeAllStones(game);
        J3O.Board.layDownStones(game);
    }});

    return struct;
});