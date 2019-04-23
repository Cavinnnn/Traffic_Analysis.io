const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/web-app/'));
app.use(allowCrossDomain);

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.get('/back-end', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
});

app.get('*/', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/web-app/index.html'));
});


var cors = require('cors')
const cors = require('cors');
app.options('*', cors());

app.use(cors());

app.listen(process.env.PORT || 8080);