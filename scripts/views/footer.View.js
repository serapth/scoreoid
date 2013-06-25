YUI.add('footerView',function(Y){
    Y.FooterView = Y.Base.create('footerView', Y.View, [], {
        initializer:function(){
            var results = Y.io('/scripts/views/templates/footer.Template',{"sync":true});
            this.template = results.responseText;

            Y.Global.on('displayResults', function(e){
                this.get('container').setHTML("<HR /><p><b>JSON/XML Server Results:</b></p><textarea rows=20 cols=100>" + e.msg + "</textarea>");
                this.get('container').addClass("footer");
            },this);
        },
        render:function(){
            this.get('container').setHTML(this.template);
            return this;
        }
    });

}, '0.0.1', { requires: ['view','event','io-base','handlebars','json-parse']});