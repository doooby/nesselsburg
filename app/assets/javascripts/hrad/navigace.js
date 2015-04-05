$(function () {

    var jqel_menu = $('#menu');


    jqel_menu.find('#nadvori').click(function () {
        (new JNES.views.Nadvori()).render();
    });

    jqel_menu.find('#dilna').click(function () {
        (new JNES.views.Dilna()).render();
    });

});