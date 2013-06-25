YUI_config = {
    groups: {
        views: {
            base: 'scripts/views',
            modules: {
                cloudView: {
                    path: '/cloud.View.js',
                    requires: ['view','event','io-base','handlebars']
                },
                editorView: {
                    path: '/editor.View.js',
                    requires: ['view','io-base',
                        'cloudView','mainMenuView','playerView','gameView','playerView','scoreView','event-custom','handlebars']
                },
                footerView: {
                    path: '/footer.View.js',
                    requires: ['view','event','io-base','handlebars']
                },
                gameView: {
                    path: '/game.View.js',
                    requires: ['view','event','io-base','handlebars']
                },
                mainMenuView: {
                    path: '/mainMenu.View.js',
                    requires: ['view','io-base','node-menunav','event','handlebars']
                },
                playerView: {
                    path: '/player.View.js',
                    requires: ['view','event','io-base','handlebars','footerView','datatype-xml','datatype',
                'dataschema','datatype-xml','handlebars','datasource-io', 'datatable-datasource','datasource-xmlschema']
                },
                scoreView: {
                    path: '/score.View.js',
                    requires: ['view','event','io-base','handlebars']
                }
            }
        }
    }
}
