/**
 * Created by doooby on 20.2.15.
 */

J3O.define('structs', (function () {
    var structs = {};

    function loader(name, loader) {
        structs[name] = loader;
    }

    Object.defineProperty(loader, 'load', {value: function (app_opts) {
        _.each(_.keys(structs), function (struct_name) {
            J3O[struct_name] = structs[struct_name](app_opts);
        });
        structs = {};
    }});

    Object.freeze(loader);
    return loader;
}()));