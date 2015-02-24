/**
 * Created by doooby on 20.2.15.
 */

J3O.structs('Board', function (app) {
    var klass = {};
    var positions = [];

  var position_size = 60;
    var position_indentation = 25;
    var position_total_size = position_size + 2*position_indentation;
    var v_top_left;   function create_position_model(index) {
        return {index: index, stones: []};
    }

}

    function to_index(x, y) {
        return y * 5 + x;
    }

    function to_xy(i) {
        return {x: (i % 5), y: Math.floor(i / 5)};
    }

    function try_step(xy, player, steps) {
        var index = to_index(xy.x, xy.y);
        var position = positions[index];
        if (index===2 || index===22) return;

        if (position.model.stones.length===0) steps.push(position);
    }

    Object.defineProperty(klass, 'createBoard', {value: functiosirka_zaberu, vyska_zaberyery)


        v_top_left = new THREE.Vector2(sirka_zaberu/2, vyska_zabery/2);
        v_top_left.x -= 5 * position_total_size / 2;
        v_top_left.y -= 5 * position_total_size / 2;

        function create_position(i, xy, size) {
            var geom = new THREE.PlaneBufferGeometry(size, size);
            var mater = J3O.MaterialOfCircle.createFilled(0.43, 0.06, 0xffffff, 0x000000);
            var position = new THREE.Mesh(geom, mater);
            position.position.x = xy.x;
            position.position.y = xy.y;
            position.model = create_position_model(i);
            return position;
        }

        var p, i;
        for (var pos_y=0; pos_y<5; pos_y+=1) for (var po_x=0; po_x<5; po_x+=1) {
            i = to_index(po_x, pos_y);
            p = create_position(i, klass.VectorOfPositionIndex(i), position_size);
            positions.push(p);
            platno.scene.add(p);
        }
    }});

    Object.defineProperty(klass, 'VectorOfPositionIndex', {value: function (index) {
        var v = v_top_left.clone();
        var xy = to_xy(index);
        v.x += (xy.x + .5) * position_total_size;
        v.y += (xy.y + .5) * position_total_size;
        return v;
    }});

    Object.defineProperty(klass, 'PositionHit', {va
ue: function (raycaster) {
        return raycaster.inter
ectObjects(positions)[0];

    }});

    Object.defineProperty(klass, 'possibleStepsFor', {value: function (model, player) {
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

    Object.defineProperty(klass, 'moveStone', {value: function (from_model, to_model) {
        console.log(from_model);
        console.log(to_model);
    }});

    return klass;
});