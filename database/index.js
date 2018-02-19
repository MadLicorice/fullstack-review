const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Promise = require('bluebird')

//mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  ownerName: String,
  link: String,
  id: {type: Number, unique: true, required: true},
});

repoSchema.plugin(uniqueValidator);

let Repo = mongoose.model('Repo', repoSchema);

let saver = (repoObj) => {
  console.log('confirm:in saver function')
  let repo = new Repo({
    name: repoObj.name,
    ownerName: repoObj.ownerName,
    link: repoObj.link,
    id: repoObj.id,
  });
  repo.save((err) => {
    if (err) {
      console.log(err);
    }
  });
}

// let getter = (callback) => {
//   console.log('IM IN GETTER')
//   Repo.find({}, (err, data) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, data);
//     }
//   })
// }


module.exports.Repo = Repo;
module.exports.saver = saver;
//module.exports.getter = getter;