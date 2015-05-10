<style type="text/css">
    #game_container {
        width: 400px;
        height: 400px;
        border: 1px solid black;
        position: relative;
    }
    #game_container #btn_menu {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 5;
        margin: 4px;
        padding: 0 3px;
        cursor: pointer;
    }
    #game_container #btn_menu:hover {
        background-color: #ececec;
    }
    #game_container .game_menu {
        position: absolute;
        width: 300px;
        height: 220px;
        top: 50%;
        left: 50%;
        margin-top: -110px;
        margin-left: -150px;
        z-index: 10;
        background-color: rgba(150, 150, 150, 0.6);
        text-align: center;
        padding: 10px;
        border: 4px solid lightgray;
    }
</style>

<div id="game_container">
    <div id="btn_menu">&#9783;</div>
</div>