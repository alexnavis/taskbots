'use strict';

/** Helper functions */

const mongoose = require('mongoose');
const PathRegExp = require('path-to-regexp');
const ROUTE_MAP = new Map();
const transformhelpers = require('./transformhelpers');
const periodic = require('periodicjs');
const logger = periodic.logger;
const path = require('path');
const Promisie = require('promisie');

function getParameterized(route) {
  if (ROUTE_MAP.has(route)) return ROUTE_MAP.get(route);
  else {
    let keys = [];
    let result = new PathRegExp(route, keys);
    ROUTE_MAP.set(route, {
      re: result,
      keys,
    });
    return { keys, re: result, };
  }
}

function findMatchingRoute(routes, location) {
  let matching;
  location = (/\?[^\s]+$/.test(location)) ? location.replace(/^([^\s\?]+)\?[^\s]+$/, '$1') : location;
  Object.keys(routes).forEach(key => {
    let result = getParameterized(key);
    if (result.re.test(location) && !matching) matching = key;
  });
  return matching;
}

function checkStatus(response) {
  return new Promise((resolve, reject) => {
    if (response.status >= 200 && response.status <= 403) {
      return resolve(response);
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      try {
        // console.debug({response})
        response.json()
          .then(res => {
            if (res.data.error) {
              return reject(res.data.error);
            } else if (res.data) {
              return reject(JSON.stringify(res.data));
            } else {
              return reject(error);
            }
          })
          .catch(() => {
            return reject(error);
          });
      } catch (e) {
        return reject(error);
      }
    }
  });
}

module.exports = {
  transformhelpers,
  getParameterized,
  findMatchingRoute,
  checkStatus,
};