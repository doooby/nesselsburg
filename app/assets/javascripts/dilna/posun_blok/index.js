//= require_self
//= require j3o.1
//= require_directory

var PB = {};

window.onload = function(){
    PB.SIRKA_BLOKU = 4;

    PB.SMER_NAHORU = 0;
    PB.SMER_VPRAVO = 1;
    PB.SMER_DOLU = 2;
    PB.SMER_VLEVO = 3;

    PB.tholder = new J3O.TextureHolder({'prefix':'games/posun_blok','suffix':'.bmp'});

    J3O.prepareDevice();
    J3O.draw();



    //-----------------
    var menu_bar = $('#menu_bar');
    menu_bar.find('input:radio').change(function(){
        var val = $(this).val();
        $('.mod_panel').css('display','none');
        $('#mod_panel_'+val).css('display','block');
    });
    $('#mod_panel_hra').find('li').click(function(){

    });
};

