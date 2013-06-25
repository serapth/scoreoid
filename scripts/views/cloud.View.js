YUI.add('cloudView',function(Y){
    Y.CloudView = Y.Base.create('cloudView', Y.View, [], {
        initializer:function(){
            var results = Y.io('/scripts/views/templates/cloud.Template',{"sync":true});
            this.template = results.responseText;
        },
        setCloudData:function(value){
            var requestCfg = {
                sync:true,
                data : {
                    api_key: Y.SCOREOID_KEY,
                    game_id: Y.GAME_ID,
                    key: "myData",
                    value: value,
                    response:"JSON"
                }
            };
            var request = Y.io("http://api.scoreoid.com/v1/setGameData", requestCfg);
            Y.Global.fire('displayResults', {msg:request.responseText});
        },
        getCloudData:function(){
            var requestCfg = {
                sync:true,
                data : {
                    api_key: Y.SCOREOID_KEY,
                    game_id: Y.GAME_ID,
                    key: "myData",
                    response:"JSON"
                }
            };
            var request = Y.io("http://api.scoreoid.com/v1/getGameData", requestCfg);
            Y.Global.fire('displayResults', {msg:request.responseText});
        },
        getMonster:function(){
            var requestCfg = {
                sync:true,
                data : {
                    api_key: Y.SCOREOID_KEY,
                    game_id: Y.GAME_ID,
                    key: "monster",
                    response:"JSON"
                }
            };
            var request = Y.io("http://api.scoreoid.com/v1/getGameData", requestCfg);
            Y.Global.fire('displayResults', {msg:request.responseText});
        },
        updateMonster:function(key,value){
            var requestCfg = {
                sync:true,
                data : {
                    api_key: Y.SCOREOID_KEY,
                    game_id: Y.GAME_ID,
                    key: key,
                    value: value,
                    response:"JSON"
                }
            };
            var request = Y.io("http://api.scoreoid.com/v1/setGameData", requestCfg);
            Y.Global.fire('displayResults', {msg:request.responseText});
        },
        deleteMonster:function(){
            var requestCfg = {
                sync:true,
                data : {
                    api_key: Y.SCOREOID_KEY,
                    game_id: Y.GAME_ID,
                    key: "monster",
                    response:"JSON"
                }
            };
            var request = Y.io("http://api.scoreoid.com/v1/unsetGameData", requestCfg);
            Y.Global.fire('displayResults', {msg:request.responseText});
        },
        render:function(){
            var container = this.get('container');
            container.setHTML(this.template);

            this.get('container').one("#buttonSetCloudData").on("click",function(){
                this.setCloudData(Y.one('#cloudData').get('value'));
            },this);

            this.get('container').one("#buttonGetCloudData").on("click",function(){
                this.getCloudData();
            },this);

            this.get('container').one("#buttonGetMonster").on("click",function(){
                this.getMonster();
            },this);

            this.get('container').one("#buttonUpdateMonster").on("click",function(){
                this.updateMonster(
                    Y.one('#comboMonsterAttribute').get('value'),
                    Y.one('#monsterNewValue').get('value')
                );
            },this);

            this.get('container').one("#buttonDeleteMonster").on("click",function(){
                this.deleteMonster();
            },this);
            return this;
        }
    });
}, '0.0.1', { requires: []});