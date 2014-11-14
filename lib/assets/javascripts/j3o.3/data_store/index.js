//= require_self
//= require_directory

/**
 * Created by doooby on 20.10.14.
 */

Object.defineProperty(J3O, 'data', {value: (function() {
    var k = {}, game_name;

    Object.defineProperty(k, 'setGameName', {value: function (value) {game_name = value;}});
    Object.defineProperty(k, 'graphicsUrl', {value: function (name) {return '/assets/'+game_name+'/graphics/'+name;}});

    Object.defineProperty(k, 'saveData', {
        value: function (key, data, clbk) {
            $.ajax( '/games/store_data.js', {
                type: 'POST',
                dataType: 'script',
                data: {game: game_name, key: key, data: data},
                success: function () {
                    console.log('saved data with key '+key);
                    clbk();
                },
                error: function (jq) {
                }
            });
        }
    });

    Object.defineProperty(k, 'loadAnyData', {
        value: function (prefix_of_key, clbk) {
            $.ajax( '/games/any_data.js', {
                type: 'GET',
                dataType: 'script',
                data: {game: game_name, key_prefix: prefix_of_key},
                success: function (resp_data) {
                    clbk(JSON.parse(resp_data));
                },
                error: function (jq) {
                    console.log(jq);
                }
            });
        }
    });

    Object.defineProperty(k, 'loadData', {
        value: function (key, clbk) {
            $.ajax( '/games/data.js', {
                type: 'GET',
                dataType: 'script',
                data: {game: game_name, key: key},
                success: function (resp_data) {
                    clbk(JSON.parse(resp_data));
                },
                error: function (jq) {
                    console.log(jq);
                }
            });
        }
    });

    Object.defineProperty(k, 'findKeysLike', {
        value: function (prefix_of_key, clbk) {
            $.ajax( '/games/any_keys.js', {
                type: 'GET',
                dataType: 'script',
                data: {game: game_name, key_prefix: prefix_of_key},
                success: function (resp_data) {
                    clbk(JSON.parse(resp_data));
                },
                error: function (jq) {
                }
            });
        }
    });

    return k;
})()});