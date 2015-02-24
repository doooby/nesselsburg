/**
 * Created by doooby on 1.1.15.
 */

J3O.LoadingManager = function (after_done, on_error) {
    var manager = {};
    var loaders = [];

    function add_loader(loader) {
        loaders.push(loader);
    }

    function loader_done(loader) {
        var i = loaders.indexOf(loader);
        loaders.splice(i, 1);
        if (loaders.length===0) after_done();
    }

    Object.defineProperty(manager, 'enqueueImage', {value: function (url, on_load) {
        var image = document.createElement( 'img' );
        function loader () {
            image.src = url;
        }
        image.addEventListener('load', function(){
            on_load(image);
            loader_done(loader);
        }, false);
        add_loader(loader);
    }});

    Object.defineProperty(manager, 'start', {value: function () {
        if (loaders.length==0) after_done();
        else for (var i=0; i<loaders.length; i+=1) loaders[i]();
    }});

    Object.freeze(manager);
    return manager;
};