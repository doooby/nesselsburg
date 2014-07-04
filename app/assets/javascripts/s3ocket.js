/**
 * Created by zelazko on 4.7.14.
 */

var S3ocket=(function(){

    function S3ocket(opts) {
        if (!opts) opts = {};
        var uri = opts['uri'] || ("ws://" + window.document.location.host + "/");

        this.id = null;
        this.tasks = {};

        this.ws = new WebSocket(uri);
        var _this = this;
        this.ws.onmessage = function(message){ _this.onSocketMessage(message); };
    }

    S3ocket.prototype.nextTaskId = function() {
        if (!this.next_task_id) this.next_task_id = 0;
        return this.next_task_id += 1;
    };

    // _________ Sending _________

    S3ocket.prototype.waitForConnection = function(clb, count_out) {
        if (this.ws.readyState===1) clb();
        else {
            if (!count_out || !(count_out<11)) count_out = 10;
            _this = this;
            if ((count_out-=1) > 0) setTimeout(function() {
                _this.waitForConnection(clb, count_out);
            }, 300);
            else throw {
                name: 'NoConnection',
                toString: function(){return this.name + ': Waitting for connection countouted.';}
            };
        }
    };

    S3ocket.prototype.send = function (hash, clb) {
        if (this.ws.readyState===1) {
            if (clb) {
                if (!hash['task']) hash['task'] = this.nextTaskId();
                this.setTaskCallback(hash['task'], clb);
            }
            this.ws.send(JSON.stringify(hash));
            return true;
        }
        else return false;
    };

    S3ocket.prototype.sendAuth = function() {
        var auth_hash;
        if (this.getAuthHash) auth_hash = this.getAuthHash();
        if (auth_hash) this.send({iam: auth_hash});
    };

    S3ocket.prototype.sendMsg = function (to, msg, task_or_clb) {
        hash = {to: to, msg: msg};
        if (task_or_clb) {
            var type = typeof task_or_clb;
            if (type==='function') return this.send(hash, task_or_clb);
            if (type==='string') hash['task'] = task_or_clb;
        }
        return this.send(hash);
    };

    // _________ Receiving _________

    S3ocket.prototype.onSocketMessage = function (message) {
        var hash = JSON.parse(message.data);
        console.log(hash);

        var yr = hash['yr'];
        if (yr && yr!=='') {
            if (yr==='who?') this.sendAuth();
            else if (yr=='n') this.onAuthFailed();
            else if (/^\d*$/.test(yr)) {
                this.id = parseInt(yr);
                this.onAuthSuccess();
            }
        }

        else {
            var from = hash['from'];
            var msg = hash['msg'];

            var task = hash['task'];
            if (task==='') task = null;
            if (task && this.fireTaskCallback(task, from, msg)) return;
            this.onMsg(from, msg, task);
        }
    };

    S3ocket.prototype.setTaskCallback = function (task, clb) {
        this.tasks[task] = clb;
    };

    S3ocket.prototype.fireTaskCallback = function (task, from, msg) {
        clb = this.tasks[task];
        if (clb) {
            if (typeof task=='number') delete this.tasks[task];
            clb(from, msg);
            return true;
        }
        return false;
    };

    // _________ Public Callbacks _________

    S3ocket.prototype.onAuthSuccess = function() {};

    S3ocket.prototype.onAuthFailed = function() {};

    S3ocket.prototype.onMsg = function(from, msg, task) {};



    return S3ocket;
})();