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
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let { username } = req.body
  getReposByUsername(username)
  res.status(201).send("posted to db")
});

app.get('/repos', function (req, res) {
  Repo.find()
    .limit(25)
    .exec(function (err, data) {
      res.status(200).send(data)
    })
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

