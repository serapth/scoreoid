YUI.add('editorView',function(Y){
    Y.EditorView = Y.Base.create('editorView', Y.View, [], {
        initializer:function(){
            this.menu = new Y.MainMenuView();
            // Change the below view value if you want to change the default view ( the one displayed on load/reload )
            this.activeView = new Y.GameView();
            this.footerView = new Y.FooterView();

            Y.Global.on('menu:menuPlayer', function(e){
                this.activeView.destroy();
                this.activeView = new Y.PlayerView();
                this.render();
            },this);

            Y.Global.on('menu:menuGame', function(e){
                this.activeView.destroy();
                this.activeView = new Y.GameView();
                this.render();
            },this);

            Y.Global.on('menu:menuScore', function(e){
                this.activeView.destroy();
                this.activeView = new Y.ScoreView();
                this.render();
            },this);

            Y.Global.on('menu:menuCloud', function(e){
                this.activeView.destroy();
                this.activeView = new Y.CloudView();
                this.render();
            },this);
        },
        render:function(){

            var content = Y.one(Y.config.doc.createDocumentFragment());
            content.append(this.menu.render().get('container'));

            var bodyDiv = Y.Node.create("<div style='width:100%;margin:0px;padding:0px'/>");
            bodyDiv.append(this.activeView.render().get('container'));
            content.append(bodyDiv);

            var footerDiv = Y.Node.create("<div style='width:100%;margin:0px;padding:0px'/>");
            footerDiv.append(this.footerView.render().get('container'));
            content.append(footerDiv);

            this.get('container').setHTML(content);
            return this;
        }
    });
}, '0.0.1', { requires: ['view','io-base','event-custom','handlebars']});