'use strict';
const pretransform = require('./pretransform');
const posttransform = require('./posttransform');

module.exports = {
  pre: pretransform,
  post: posttransform,
};