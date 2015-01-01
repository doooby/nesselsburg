///**
// * Created by doooby on 31.12.14.
// */
//
//var Klass = (function () {
//    function make_object(_parent, _maker) {
//        var _members = {};
//        var _object = Object.create(_parent);
//
//        Object.defineProperty(_object, 'inheritor', {value: function (maker) {
//            var parent = this;
//            return make_object(parent, function (object, members) {
//
//                Object.defineProperties(object, {
//                    parent: {value: parent},
//                    set_member: {value: function (name, value) {
//                        Object.defineProperty(members, name, {value: value});
//                    }},
//                    get_member: {value: function (name) {
//                        var member = members[name];
//                        if (member===undefined) member = parent.get_member(name);
//                        return member;
//                    }}
//                });
//
//                if (typeof maker==='function') maker.call(object);
//            });
//        }});
//
//        _maker.call(_object, _members);
//        return _object;
//    }
//
//    return make_object({}, function (object) {
//        Object.defineProperties(object, {
//
//        });
//
//        Object.defineProperty(object, 'define', {value: function (name, definition) {
//            if (typeof definition === 'function') definition = {value: definition};
//            Object.defineProperty(this, name, definition);
//        }});
//
//        Object.defineProperty(object, 'get_member', {value: function () {}});
//
//    });
//})();