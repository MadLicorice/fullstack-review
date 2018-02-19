const express = require('express');
const parser = require('body-parser');
const getRepo = require('../helpers/github.js');
const Promise = require('bluebird');
const db = require('../database/index.js');
const mongoose = require('mongoose');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.post('/repos', parser.json());

app.post('/repos', function (req, res) {
  let data = req.body.term;
  getRepo.getReposByUsername(data)
  .then(data => {
    data.forEach(repo => {
      let newRepo = {
        name: repo.name,
        ownerName: repo.owner.login,
        link: repo.html_url,
        id: repo.id,
      };
      db.saver(newRepo)
      res.send('Finished POST');
    })
  })        
  .catch(err => {
    console.log(err);
  })
});

app.get('/repos', function (req, res) {
  console.log(req.body);
  db.Repo.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send(data)
    }
  })
  .limit(25)
  .sort({ownerName: 1})

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});







// app.post('/repos', function (req, res) {
//   let data = req.body.term;
//   let promiseArr = [];

//   getRepo.getReposByUsername(data)
//   .then(data => {
//     data.forEach(repo => {
//       let newRepo = {
//         name: repo.name,
//         ownerName: repo.owner.login,
//         link: repo.html_url,
//         id: repo.id,
//       };
//       promiseArr.push(saver.saver(newRepo));
//     })
//     Promise.all(promiseArr).then(result => {
//       console.log('ASHKONZ');
//       res.send('POST received');
//     })        
//   }).catch(err => {
//     console.log(err);
//   })
// });