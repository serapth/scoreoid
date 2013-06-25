YUI.add('gameView',function(Y){
    Y.GameView = Y.Base.create('gameView', Y.View, [], {
        initializer:function(){
            var results = Y.io('/scripts/views/templates/game.Template',{"sync":true});
            this.template = results.responseText;
        },
        render:function(){
            var container = this.get('container');
            container.setHTML(this.template);

            // Wire up controls
            container.one("#buttonGetGameInfo").on("click",function(){
                this.getGameData();
            },this);

            container.one("#buttonGetGamePlayers").on("click",function(){
                this.getGamePlayers();
            },this);

            container.one("#buttonGetWealthiest").on("click",function(){
                this.getGameTop("gold");
            },this);

            return this;
        },
        getGameData:function(){
            // This is a blocking web request... in real world, BAD!
            var requestCfg = {
                sync:true,
                data : {
                    api_key: Y.SCOREOID_KEY,
                    game_id: Y.GAME_ID,
                    response:"JSON"
                }
            };
            var request = Y.io("http://api.scoreoid.com/v1/getGame", requestCfg);

            Y.Global.fire('displayResults', {msg:request.responseText});
        },
        getGamePlayers:function(){
            // This is a blocking web request... in real world, BAD!
            var requestCfg = {
                sync:true,
                data : {
                    api_key: Y.SCOREOID_KEY,
                    game_id: Y.GAME_ID,
                    response:"JSON"
                }
            };
            var request = Y.io("http://api.scoreoid.com/v1/getPlayers", requestCfg);

            Y.Global.fire('displayResults', {msg:request.responseText});
        },
        getGameTop:function(gameField){
            var requestCfg = {
                sync:true,
                data : {
                    api_key: Y.SCOREOID_KEY,
                    game_id: Y.GAME_ID,
                    response:"JSON",
                    field:gameField
                }
            };
            var request = Y.io("http://api.scoreoid.com/v1/getGameTop", requestCfg);

            Y.Global.fire('displayResults', {msg:request.responseText});

        }

    });



}, '0.0.1', { requires: ['view','event','io-base','handlebars']});