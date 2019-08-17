const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = new Schema({
  name: String,
  owner: {
    login: String
  },
  html_url: String,
  stargazers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (dataArr) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  Repo.insertMany(dataArr)
    .then(() => console.log('done saving'))
    .catch((err) => console.log(err))
}

module.exports = save;
module.exports = Repo;