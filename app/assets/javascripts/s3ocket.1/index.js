//= require_self
//= require_directory

var S3ocket={};

function get_test_socket(clb){
    var c = new S3ocket.Client('ws://localhost:3055/',function(){
        c.onAuthSuccess = function(){
            clb();
        };
        c.getAuthHash = function(){return {login:'karlos'};};
        c.sendAuthorization();
    });
    return c;
}