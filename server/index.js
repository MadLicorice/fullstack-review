const express = require('express');
const parser = require('body-parser');
const getRepo = require('../helpers/github.js');
const Promise = require('bluebird');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.post('/repos', parser.json());

app.post('/repos', function (req, res) {
  let data = req.body.term;

  // let username = req;
  //console.log(req.body);
  // console.log('THISISREQ', req);
  getRepo.getReposByUsername(data)
    .then((data) => {
    console.log(data);
    res.send(data);
  });

  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

