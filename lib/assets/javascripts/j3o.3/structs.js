/**
 * Created by doooby on 20.2.15.
 */

J3O.structs = function () {
    var structs = {};

    function strcuts_loader(klass_name, loader) {
        structs[klass_name] = loader;
    }

    strcuts_loader.load = function (app_opts) {
        var struct;
        for(struct in structs) {
            if (structs.hasOwnProperty(struct)) {
                J3O[struct] = structs[struct](app_opts);
            }
        }
        delete J3O.structs;
    };

    return strcuts_loader;
}();