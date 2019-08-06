'use strict';

let crons = require('./crons');

module.exports = {
  GET: {
    '/cron/indexPage': [
      crons.formatIndexPage
    ],
    '/cron/addPage': [
      crons.formatAddPage
    ]
  },
  POST: {
  },
};