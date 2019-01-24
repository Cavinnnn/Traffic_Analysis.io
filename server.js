const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/web-app/'));

app.get('*/', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/web-app/index.html'));
});

app.listen(process.env.PORT || 8080);
