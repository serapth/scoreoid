YUI.add('playerView',function(Y){
    Y.PlayerView = Y.Base.create('playerView', Y.View, [], {
        players:null,
        initializer:function(){
            var results = Y.io('/scripts/views/templates/player.Template',{"sync":true});
            this.template = results.responseText;
        },
        createPlayer:function(playerName){
            var requestCfg = {
                sync:true,
                data : {
                    api_key: Y.SCOREOID_KEY,
                    game_id: Y.GAME_ID,
                    username: playerName,
                    response:"JSON"
                }
            };
            var request = Y.io("http://api.scoreoid.com/v1/createPlayer", requestCfg);
            Y.Global.fire('displayResults', {msg:request.responseText});
        },
        getPlayerField:function(playerName,fieldName){
            var requestCfg = {
                sync:true,
                data : {
                    api_key: Y.SCOREOID_KEY,
                    game_id: Y.GAME_ID,
                    username: playerName,
                    field: fieldName,
                    response:"JSON"
                }
            };
            var request = Y.io("http://api.scoreoid.com/v1/getPlayerField", requestCfg);
            Y.Global.fire('displayResults', {msg:request.responseText});
        },
        setPlayerField:function(playerName,fieldName,fieldValue){
            var requestCfg = {
                sync:true,
                data : {
                    api_key: Y.SCOREOID_KEY,
                    game_id: Y.GAME_ID,
                    username: playerName,
                    field: fieldName,
                    value: fieldValue,
                    response:"JSON"
                }
            };
            var request = Y.io("http://api.scoreoid.com/v1/updatePlayerField", requestCfg);
            Y.Global.fire('displayResults', {msg:request.responseText});
        },
        render:function(){
            this.get('container').setHTML(this.template);

            // Wire up controls
            this.get('container').one("#playerGetAll").on("click",function(){

                var requestCfg = {
                    method:"POST",
                    data : {
                        api_key: Y.SCOREOID_KEY,
                        game_id: Y.GAME_ID,
                        response:"XML"
                    }
                };

                var ds = new Y.DataSource.IO({source:"http://api.scoreoid.com/v1/getPlayers"});
                ds.plug(Y.Plugin.DataSourceXMLSchema, {
                        schema: {
                            resultListLocator: "player",
                            resultFields: [
                                {   key:"Username", locator:"@username" },
                                {    key:"Email", locator:"@email"      },
                                {    key:"TimePlayed", locator:"@time_played"      },
                                {    key:"Gold", locator:"@gold"      },
                                {    key:"BestScore", locator:"@best_score"      }
                            ]
                        }
                    });
                ds.sendRequest({
                    callback:{
                        success: function(e)
                            {
                                var dt = new Y.DataTable(
                                    {
                                    columns:[{key:"Username"},{key:"Email"},{key:"TimePlayed"},{key:"Gold"},{key:"BestScore"}],
                                    data: e.response.results,
                                    summary:"List of all players in the game",
                                    caption:"Players"
                                    });
                                // Clear the table, in case one already exists
                                Y.one("#dataTable").setContent("");
                                // Now populate
                                dt.render(Y.one("#dataTable"));

                                Y.Global.fire('displayResults', {msg:e.data.response});
                            },
                        failure: function(e){
                            Y.log(e);
                        }
                    },
                    cfg:requestCfg
                });

            },this);

            // Create Player Button Handler
            this.get('container').one("#buttonCreatePlayer").on("click",function(){
                this.createPlayer(Y.one('#playerName').get('value'));
            },this);

            //Get Player Field Button Handler
            this.get('container').one("#getPlayerField").on("click",function(){
                this.getPlayerField(Y.one('#playersCombo').get('value'),
                                    Y.one('#fieldCombo').get('value'));
            },this);

            //Set Player Field Button Handler
            this.get('container').one("#setPlayerField").on("click",function(){
                this.setPlayerField(Y.one('#playersCombo').get('value'),
                    Y.one('#fieldCombo').get('value'),
                    Y.one('#playerField').get('value'));
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
                //alert(item.Player.username);
            });

            return this;

        }
    });

}, '0.0.1', { requires: []});