'use strict';
const GLOBAL_PROMISE = Promise;
Promise = GLOBAL_PROMISE;
const periodic = require('periodicjs');

periodic.init({
  debug: true,
})
  .then(periodicInitStatus => {
    let reactappUtilities = periodic.locals.extensions.get('@digifi-los/reactapp');
    periodic.locals.extensions.set('periodicjs.ext.reactapp', reactappUtilities);
    let reactappSettings = periodic.settings.extensions[ '@digifi-los/reactapp' ];
    periodic.settings.extensions[ 'periodicjs.ext.reactapp' ] = reactappSettings;
  })
  .catch(e => {
    console.error(e);
  });