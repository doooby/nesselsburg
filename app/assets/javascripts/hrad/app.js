//= require_self
//= require ./jnes
//= require ./router
//= require_tree .
//= require ./navigace

'use strict';

var JNES = {};

Object.defineProperties(JNES, {
    views: {value: {}, enumerable: true}
});

$(function () {
    (new JNES.views.Nadvori()).render();
});