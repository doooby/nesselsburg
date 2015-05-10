//= require_self
//= require ./socket
//= require ./canvas
//= require ./structs
//= require ./utils

/**
 * Created by doooby on 21.3.15.
 */

"use strict";
var J3O = {};

Object.defineProperty(J3O, 'define', {value: function(name, value) {
    Object.defineProperty(J3O, name, {value: value});
}});