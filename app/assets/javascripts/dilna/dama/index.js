//= require_self
//= require_directory


function VypisText(text) {
    document.getElementById("info").innerText = text;
}

window.onload = function(){
    DAMA.hra = new DAMA.Hra();
    J3O.prepareDevice();
    J3O.draw();
};