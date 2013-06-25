YUI.add('scoreView',function(Y){
    Y.ScoreView = Y.Base.create('gameView', Y.View, [], {
        players:null,
        initializer:function(){
            var results = Y.io('/scripts/views/templates/score.Template',{"sync":true});
            this.template = results.responseText;
        },
        getHighScores:function(){
            var requestCfg = {
                sync:true,
                data : {
                    api_key: Y.SCOREOID_KEY,
                    game_id: Y.GAME_ID,
                    response:"JSON"
                }
            };
            var request = Y.io("http://api.scoreoid.com/v1/getScores", requestCfg);

            Y.Global.fire('displayResults', {msg:request.responseText});
        },
        getHighScoresSorted:function(bLowToHigh){
            var requestCfg = {
                    sync:true,
                    data : {
                        api_key: Y.SCOREOID_KEY,
                        game_id: Y.GAME_ID,
                        response:"JSON",
                        order_by:"score",
                        order:"asc"
                    }
                };
            if(bLowToHigh)
                requestCfg.data.order = "desc";


            var request = Y.io("http://api.scoreoid.com/v1/getScores", requestCfg);

            Y.Global.fire('displayResults', {msg:request.responseText});
        },
        createHighScore:function(playerName,score){
            var requestCfg = {
                sync:true,
                data : {
                    api_key: Y.SCOREOID_KEY,
                    game_id: Y.GAME_ID,
                    username: playerName,
                    score: score,
                    response:"JSON"
                }
            };
            var request = Y.io("http://api.scoreoid.com/v1/createScore", requestCfg);
            Y.Global.fire('displayResults', {msg:request.responseText});
        },
        getAverageScore:function(){
            var requestCfg = {
                sync:true,
                data : {
                    api_key: Y.SCOREOID_KEY,
                    game_id: Y.GAME_ID,
                    response:"JSON"
                }
            };
            var request = Y.io("http://api.scoreoid.com/v1/getAverageScore", requestCfg);
            Y.Global.fire('displayResults', {msg:request.responseText});
        },
        render:function(){
            var container = this.get('container');
            container.setHTML(this.template);

            // Create Get High Scores Button Handler
            this.get('container').one("#buttonGetHighScores").on("click",function(){
                this.getHighScores();
            },this);

            // Create Get High Score High to Low button handler
            this.get('container').one("#buttonGetHighScoresHighToLow").on("click",function(){
                this.getHighScoresSorted(true);
            },this);

            // Create Get High Score Low to High button handler
            this.get('container').one("#buttonGetHighScoresLowToHigh").on("click",function(){
                this.getHighScoresSorted(false);
            },this);

            // Create Get Average Score button
            this.get('container').one("#buttonGetAverageScore").on("click",function(){
                this.getAverageScore();
            },this);

            var requestCfg = {
                sync:true,
                data : {
                    api_key: Y.SCOREOID_KEY,
                    game_id: Y.GAME_ID,
                    response:"JSON"
                }
            };

            // Get the players from the server to populate drop down box
            var request = Y.io("http://api.scoreoid.com/v1/getPlayers", requestCfg);
            // Turn back into a javascript object
            this.players = JSON.parse(request.responseText);
            // Iterate through collection, adding to players select box
            var selectBox = this.get('container').one('#playersCombo');
            Y.Object.each(this.players,function(item,idx){
                var option = document.createElement("option");
                option.text = option.value = item.Player.username;
                selectBox.appendChild(option);
            });

            // Create Score Button Handler
            this.get('container').one("#buttonCreateHighScore").on("click",function(){
                this.createHighScore(Y.one('#playersCombo').get('value'), Y.one('#score').get('value'));
            },this);

            this.get('container').one("#buttonCreateHighScore").on("click",function(){
                this.createHighScore(Y.one('#playersCombo').get('value'), Y.one('#score').get('value'));
            },this);
            return this;
        }
    });
}, '0.0.1', { requires: []});