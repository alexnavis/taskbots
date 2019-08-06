'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const scheme = {
  id: ObjectId,
  title: String,
  name: {
    type: String,
    unique: true,
  },
  displayname: String,
  templatehtml: String,
  userId: ObjectId,
  username: String,
  description: String,
  version: {
    default: 1,
    type: Number,
  },
  tags: [{
    type: ObjectId,
    ref: 'Tag'
  }],
  random: Number,
};

module.exports = {
  scheme,
  options: {},
  coreDataOptions: {
    docid: '_id',
    sort: { createdat: -1, },
    search: ['title', 'name', 'content'],
    population: 'tags categories primaryauthor',
  }
};