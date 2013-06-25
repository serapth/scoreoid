var express = require('express'),
    server = express();

server.use('/scripts', express.static(__dirname + '/scripts'));
server.use('/stylesheets', express.static(__dirname + '/stylesheets'));

server.get('/', function (req, res) {
    res.set('Access-Control-Allow-Origin','*').sendfile('index.html');
});

server.listen(process.env.PORT || 3000);

