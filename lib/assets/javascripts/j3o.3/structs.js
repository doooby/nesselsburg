/**
 * Created by doooby on 20.2.15.
 */

//J3O.structs = function () {
//    var structs = {};
//
//    function strcuts_loader(klass_name, loader) {
//        structs[klass_name] = loader;
//    }
//
//    strcuts_loader.load = function (app_opts) {
//        var struct;
//        for(struct in structs) {
//            if (structs.hasOwnProperty(struct)) {
//                J3O[struct] = structs[struct](app_opts);
//            }
//        }
//        delete J3O.structs;
//    };
//
//    return strcuts_loader;
//}();

J3O.struct = (function () {
    var structs = {};
    var anonymous_structs = [];

    var struct_constructor_proto = {};
    Object.defineProperties(struct_constructor_proto, {
        object: {value: null},
        attribute: {value: function (name, def_value, writable){
            Object.defineProperty(this.object, name, {value: def_value, writable: !!writable});
        }},
        method: {value: function(name, f) {
            Object.defineProperty(this.object, name, {value: f});
        }}
    });

    function loader (struct_name, f) {
        if (typeof struct_name==='function') anonymous_structs.push(struct_name);
        else structs[struct_name] = f;
    }

    Object.defineProperty(loader, 'load', {value: function (app_opts) {
        var struct_name, struct_constructor, anonymous_struct;
        for (struct_name in structs) {
            if (structs.hasOwnProperty(struct_name)) {
                struct_constructor = Object.create(struct_constructor_proto, {object: {value: {}}});
                structs[struct_name].call(struct_constructor, app_opts);
                J3O[struct_name] = struct_constructor.object;
            }
        }
        anonymous_structs.forEach(function (anonymous_struct) {
            anonymous_struct(app_opts);
        });
        delete J3O.struct;
    }});

    return loader;
}());