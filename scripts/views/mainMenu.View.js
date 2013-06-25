YUI.add('mainMenuView',function(Y){
    Y.MainMenuView = Y.Base.create('mainMenuView', Y.View, [], {
        initializer:function(){
            var results = Y.io('/scripts/views/templates/mainMenu.Template',{"sync":true});
            // No need to compile, nothing in template but HTML
            // this.template = Y.Handlebars.compile(results.responseText);
            this.template = results.responseText;
        },
        render:function(){
            this.get('container').setHTML(this.template);
            var container = this.get('container');

            var menu = container.one("#appmenu");
            menu.plug(Y.Plugin.NodeMenuNav);

            //Register menu handlers
            var menuGame = container.one('#menuGame');
            menuGame.on("click", function(e){
                Y.Global.fire('menu:menuGame', {msg:null});
            });

            var menuPlayer = container.one('#menuPlayer');
            menuPlayer.on("click", function(e){
                Y.Global.fire('menu:menuPlayer', {msg:null});
            });

            var menuScore = container.one('#menuScore');
            menuScore.on("click", function(e){
                Y.Global.fire('menu:menuScore', {msg:null});
            });

            var menuCloud = container.one('#menuCloud');
            menuCloud.on("click", function(e){
                Y.Global.fire('menu:menuCloud', {msg:null});
            });
            return this;
        }
    });
}, '0.0.1', { requires: ['view','io-base','node-menunav','event','handlebars']});