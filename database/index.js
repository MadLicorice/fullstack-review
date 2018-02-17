const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  ownerName: String,
  link: String,
  id: {type: Number, unique: true, required: true},
});

repoSchema.plugin(uniqueValidator);

let Repo = mongoose.model('Repo', repoSchema);

let save = (name, ownerName, link, id) => {

}

module.exports.save = save;