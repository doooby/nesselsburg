/**
 * Created by doooby on 18.10.14.
 */

Object.defineProperty(J3O.UI, 'createPanel', {value: (function(){
    var object = {};

//    Object.defineProperty(object, 'left', {value: NaN, writable: true});
//    Object.defineProperty(object, 'top', {value: NaN, writable: true});
//    Object.defineProperty(object, 'width', {value: NaN, writable: true});
//    Object.defineProperty(object, 'height', {value: NaN, writable: true});
//    Object.defineProperty(object, 'mesh', {value: null, writable: true});
//    Object.defineProperty(object, 'position', {
//        set: function (val) {
//            this.left = val[0];
//            this.top = val[1];
//        },
//        get: function () {return [this.left, this.top];}
//    });
//    Object.defineProperty(object, 'size', {
//        set: function (val) {
//            this.width = val[0];
//            this.height = val[1];
//        },
//        get: function () {return [this.width, this.height];}
//    });


    return function(ui, clbk){
        var new_object = Object.create(object);
        Object.defineProperty(new_object, 'ui', {value: ui});
        clbk.call(new_object);

        new_object.mesh.matrixAutoUpdate = false;

        return new_object;
    };
})()});

//    Object.defineProperty(klass, 'createGeometry', {
//        value: function () {
//            var x_size, y_size, vmin, vmax, geom;
//            var ggg = 20;
//            x_size = _vmax.x - _vmin.x;
//            y_size = _vmax.y - _vmin.y;
//            vmin = new THREE.Vector3(
//                    x_size * (this._left / _canvas_object.width) + _vmin.x,
//                    y_size * (this._top / _canvas_object.height) + _vmin.y,
//                ggg
//            );
//            vmax = new THREE.Vector3(
//                    x_size * ((this._left+this._width) / _canvas_object.width) + _vmin.x,
//                    y_size * ((this._top+this._height) / _canvas_object.height) + _vmin.y,
//                ggg
//            );
//            geom = new THREE.Geometry();
//            geom.vertices.push(vmin);
//            geom.vertices.push(new THREE.Vector3(vmax.x, vmin.y, ggg));
//            geom.vertices.push(vmax);
//            geom.vertices.push(new THREE.Vector3(vmin.x, vmax.y, ggg));
////                geom.vertices.push(new THREE.Vector3(10, 10, 0));
////                geom.vertices.push(new THREE.Vector3(0, 0, 0));
////                geom.vertices.push(new THREE.Vector3(10, 0, 0));
//            geom.faces.push(new THREE.Face3(0, 1, 3));
//            geom.faces.push(new THREE.Face3(1, 2, 3));
////                geom.faces.push(new THREE.Face3(0, 1, 2));
//            return geom;
//
////                shape = new THREE.Shape();
////                shape.moveTo(vmin.x, vmin.y);
////                shape.lineTo(vmin.x, vmax.y);
////                shape.lineTo(vmax.x, vmax.y);
////                shape.lineTo(vmax.x, vmin.y);
////                shape.lineTo(vmin.x, vmin.y);
////                return new THREE.ShapeGeometry(shape);
//        }
//    });
//    Object.defineProperty(klass, 'onScene', {
//        set: function (val) {
//            if (val) _canvas_object.scene.add(this._mesh);
//            else _canvas_object.scene.remove(this._mesh);
//        }
//    });
//    Object.defineProperty(ui_klass, 'makePanel', {value: function(f){
//        var panel;
//        panel = Object.create(panel_klass);
//        f.call(panel);
////        panel._mesh.position.z = _z_position;
//        panel.onScene = true;
//        return panel;
//    }});
