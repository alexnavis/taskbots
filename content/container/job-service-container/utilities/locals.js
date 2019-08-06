'use strict';

module.exports = function(periodic) {
  //configure locals
  periodic.app.themeconfig = periodic.app.themeconfig || {};

  const THEMESETTINGS = periodic.settings.container['job-service-container'];
  periodic.app.themeconfig.settings = THEMESETTINGS;
  periodic.app.themeconfig.environmentSettings = periodic.settings.application.environment;

  var psa_oauth_2_client = periodic.app.controller.extension.login.loginExtSettings.passport.oauth.oauth2client.filter(config => config.service_name === 'psa')[0];
  periodic.app.themeconfig.psa_oauth_2_client = psa_oauth_2_client;

  periodic.app.locals.google_maps_api_key = periodic.app.themeconfig.google_maps_api_key;
  periodic.app.locals.plaid = periodic.settings.container['job-service-container'].plaid;

  periodic.app.themeconfig.microservice = require('./microservice')(periodic);
  periodic.app.themeconfig.utilities = require('./index')(periodic);

  return periodic;
};