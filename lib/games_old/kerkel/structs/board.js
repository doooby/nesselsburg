/**
 * Created by doooby on 20.2.15.
 */

J3O.structs('Board', function (app) {
    var struct = {};
    var positions = [];

    function each_position(for_each) {
//        for (var i=0; i<positions.length; i+=1) for_each(positions[i], i);
    }

    function to_index(x, y) {
//        return y * 5 + x;
    }

    function to_xy(i) {
//        return {x: (i % 5), y: Math.floor(i / 5)};
    }

    function try_step(xy, player, steps) {
        var index = to_index(xy.x, xy.y);
        var position = positions[index];
        if (index===2 || index===22) return;
        if (position.model.stones.length===0) steps.push(position);
    }

    Object.defineProperty(struct, 'createBoard', {value: function() {
//        function create_position(index, v_position) {
//            var geom = new THREE.PlaneBufferGeometry(app.position_size, app.position_size);
//            var mater = J3O.MaterialOfCircle.createFilled(0.43, 0.06, 0xffffff, 0x000000);
//            var position = new THREE.Mesh(geom, mater);
//            position.position.copy(v_position);
//            position.model = {
//                index: index,
//                stones: []
//            };
//            return position;
//        }
//
//        var p, i;
//        for (i=0; i<25; i+=1) {
//            p = create_position(i, struct.vectorOfPositionIndex(i));
//            positions.push(p);
//            canvas.scene.add(p);
//        }
    }});

//    Object.defineProperty(struct, 'local_player', {value: null, writable: true});

    Object.defineProperty(struct, 'vectorOfPositionIndex', {value: function (index) {
//        var v = app.board_top_left.clone();
//        var xy = to_xy(index);
//        v.x += (xy.x + .5) * app.position_total_size;
//        v.y += (xy.y + .5) * app.position_total_size;
//        return v;
    }});

    Object.defineProperty(struct, 'positionHit', {value: function (raycaster) {
        return raycaster.intersectObjects(positions)[0];
    }});

    Object.defineProperty(struct, 'possibleStepsFor', {value: function (model, player) {
        var i = model.index;
        var xy = to_xy(i);
        if (i===2 || i===22) return [];
        var steps = [], new_xy;

        new_xy = {x: xy.x, y: xy.y};
        if (new_xy.x===4) {
            if (new_xy.y%2===0) new_xy.x = 0;
            else if(new_xy.y===1) new_xy.y = 3;
            else new_xy.y = 1;
            if (new_xy.y!==2) try_step(new_xy, player, steps);
        }
        else {
            new_xy.x += 1;
            try_step(new_xy, player, steps);
        }

        new_xy = {x: xy.x, y: xy.y};
        if (new_xy.x===0) {
            if (new_xy.y%2===0) new_xy.x = 4;
            else if(new_xy.y===1) new_xy.y = 3;
            else new_xy.y = 1;
            if (new_xy.y!==2) try_step(new_xy, player, steps);
        }
        else {
            new_xy.x -= 1;
            try_step(new_xy, player, steps);
        }

        new_xy = {x: xy.x, y: xy.y};
        if (new_xy.y===4) {
            if (new_xy.x%2===0) new_xy.y = 0;
            else if(new_xy.x===1) new_xy.x = 3;
            else new_xy.x = 1;
            if (new_xy.x!==2) try_step(new_xy, player, steps);
        }
        else {
            new_xy.y += 1;
            try_step(new_xy, player, steps);
        }

        new_xy = {x: xy.x, y: xy.y};
        if (new_xy.y===0) {
            if (new_xy.x%2===0) new_xy.y = 4;
            else if(new_xy.x===1) new_xy.x = 3;
            else new_xy.x = 1;
            if (new_xy.x!==2) try_step(new_xy, player, steps);
        }
        else {
            new_xy.y -= 1;
            try_step(new_xy, player, steps);
        }

        if (i%2===0) {
            new_xy = {x: xy.x+1, y: xy.y+1};
            if (new_xy.x!==5 && new_xy.y!==5) try_step(new_xy, player, steps);

            new_xy = {x: xy.x-1, y: xy.y+1};
            if (new_xy.x!==-1 && new_xy.y!==5) try_step(new_xy, player, steps);

            new_xy = {x: xy.x-1, y: xy.y-1};
            if (new_xy.x!==-1 && new_xy.y!==-1) try_step(new_xy, player, steps);

            new_xy = {x: xy.x+1, y: xy.y-1};
            if (new_xy.x!==5 && new_xy.y!==-1) try_step(new_xy, player, steps);
        }

        return steps;
    }});

    Object.defineProperty(struct, 'removeAllStones', {value: function () {
//        each_position(function (p) {
//            var s = p.model.stone;
//            if (s) {
//                canvas.scene.remove(s);
//                p.model.stone = null;
//            }
//        });
    }});

    Object.defineProperty(struct, 'layDownStones', {value: function (game) {
//        game.eachStone(function (s) {
//            positions[s.model.position].model.stone = s;
//            canvas.scene.add(s);
//        });
    }});


    Object.defineProperty(struct, 'moveStone', {value: function (from_model, to_model, game) {
        if (to_model.stone) {
            canvas.scene.remove(to_model.stone);
        }
        to_model.stone = from_model.stone;
        from_model.stone = null;
        to_model.stone.model.moveTo(to_model.index);
        to_model.stone.model.rotate();
        canvas.redraw();
    }});

    return struct;
});