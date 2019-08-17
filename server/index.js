const express = require('express');
const app = express();
const getReposByUsername = require('../helpers/github.js')

const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path');
const Repo = require('../database/index.js')
const mongoose = require('mongoose');


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let { username } = req.body
  getReposByUsername(username)
  res.status(201).send("posted to db")
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  Repo.find()
    // .sort({ 'date': -1 })
    .limit(25)
    .exec(function (err, data) {
      res.status(200).send(data)
    })
  //   .then(() => res.status(200).send("got from db"))
  //   .catch((err) => res.status(400).send("err getting", err))
  // getRepos()

});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

