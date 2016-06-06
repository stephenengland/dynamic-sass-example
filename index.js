var express = require('express');
var app = express();
var sass = require('node-sass');
var path = require('path');

function addVariables (req) {
  if (req.query['color']) {
    return '$text-color: #' + req.query['color'] + ';';
  }

  return '';
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/sass', function (req, res) {
  sass.render({
    data: addVariables(req) + '@import "main";',
    includePaths: [__dirname]
  }, function (err, result) {
    if (err) {
      console.log(err);
      res.send(500).end();
    }
    else {
      res.header('Content-type', 'text/css');
      res.send(result.css).end();
    }
  });
});

app.listen(3000, function () {
  console.log('dynamic-sass-example listening on port 3000');
});