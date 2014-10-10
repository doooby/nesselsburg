/**
 * Created by doooby on 2.10.14.
 */

var GamesData = (function () {
    var klass;

    if (!GAME_NAME) {
        throw 'Není definována konstanta GAME_NAME';
    }

    klass = Object.create(Object);

    klass.defineProperty(klass, 'saveData', {
        value: function (key, data) {
            $.ajax( '/games/store_data.js', {
                type: 'POST',
                dataType: 'script',
                data: {game: GAME_NAME, key: key, data: data},
                success: function () {
                    console.log('saved data with key '+key);
                },
                error: function (jq) {
                }
            });
        }
    });

    klass.defineProperty(klass, 'loadAnyData', {
        value: function (prefix_of_key, clbk) {
            $.ajax( '/games/any_data.js', {
                type: 'GET',
                dataType: 'script',
                data: {game: GAME_NAME, key_prefix: prefix_of_key},
                success: function (resp_data) {
                    clbk(JSON.parse(resp_data));
                },
                error: function (jq) {
                    console.log(jq);
                }
            });
        }
    });

    klass.defineProperty(klass, 'loadData', {
        value: function (key, clbk) {
            $.ajax( '/games/data.js', {
                type: 'GET',
                dataType: 'script',
                data: {game: GAME_NAME, key: key},
                success: function (resp_data) {
                    clbk(JSON.parse(resp_data));
                },
                error: function (jq) {
                    console.log(jq);
                }
            });
        }
    });

    klass.defineProperty(klass, 'findKeysLike', {
        value: function (prefix_of_key, clbk) {
            $.ajax( '/games/any_keys.js', {
                type: 'GET',
                dataType: 'script',
                data: {game: GAME_NAME, key_prefix: prefix_of_key},
                success: function (resp_data) {
                    clbk(JSON.parse(resp_data));
                },
                error: function (jq) {
                }
            });
        }
    });

    klass.defineProperty(klass, 'graphicsUrl', {
        value: function (name) {
            return '/assets/'+GAME_NAME+'/graphics/'+name;
        }
    });

    return Object.freeze(klass);
})();