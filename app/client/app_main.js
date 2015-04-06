//= require_self
//= require ./jnes
//= require ./router.js
//= require_directory ./models
//= require_directory ./collections
//= require_directory ./views

'use strict';

var JNES = {};

$(function () {
    // container boiler plate for plugin games
    _.extend(document.getElementById('container'), {
        gameLoaded: function (game) {
            JNES.off('get_game');
            JNES.once('get_game', function (getter) {getter(game);});
        }
    });


    // JNES set up
    Object.defineProperty(JNES, 'menu', {enumerable: true, value: new JNES.views.Menu()});
    Object.defineProperty(JNES, 'udalosti', {enumerable: true, value: new JNES.views.Udalosti()});

    // start app
    Backbone.history.start();
});