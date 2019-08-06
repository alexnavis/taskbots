'use strict';
const periodic = require('periodicjs');
const Promisie = require('promisie');
const utilities = require('../utilities');
const transforms = require('../transforms');

const transformRequest = (type) => (req, res, next) => {
  let transformType = (type === 'pre') ? transforms.pre : transforms.post;
  let transformsFilters = (transformType[req.method]) ?
    utilities.helpers.findMatchingRoute(transformType[req.method], req._parsedOriginalUrl.pathname) :
    false;
  if (transformsFilters && transformsFilters.length > 0) {
    Promisie.pipe(transformType[req.method][transformsFilters])(req)
      .then(newreq => {
        req = newreq;
        next();
      }, next);
  } else {
    next();
  }
};

const posttransform = transformRequest('post');
const pretransform = transformRequest('pre');

module.exports = {
  pretransform,
  posttransform,
};