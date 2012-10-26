var app = require('express').createServer(),
port = 1337;

app.listen(port);

app.get('/', function(req, res){
    res.send('hello world');
});

app.get('/test', function(req, res){
    res.send('test');
});

app.get('/app', function(req, res){
    res.send('app');
});

app.get('/user/:id', function(req, res){
    res.send('user id:' + req.params.id);
});

app.get(/^\/ip?(?:\/(\d{2,3})(?:\.(\d{2,3}))(?:\.(\d{2,3}))(?:\.(\d{2,3})))?/, function(req, res){
    res.send(req.params);
});

app.get('*', function(req, res){
    res.send('Page not found!', 404);
});

console.log('start express server\n');