'use strict';
let organization_id, logger, periodic, cron_name;

/*
  This bot will just log "Running a basic task..." to the terminal. You can add any javascript functions to this script file and it will run the entire process on the interval that you set through the UI.
*/
const runBasicTask = async () => {
  try {
    console.log('Running a basic task...');
  } catch (err) {
    logger.error('Failed to run basic task: ', err);
  }
};

// The initialize function is always required in a task bot. Initialize should be a function that returns another function
var initialize = function(resources, options) {
  periodic = resources;
  logger = periodic.logger;
  organization_id = options.organization;
  cron_name = options.cron_name;
  return runBasicTask;
};

// The module exports should always export the script and test as shown below
module.exports = {
  script: initialize,
  test: null,
};
