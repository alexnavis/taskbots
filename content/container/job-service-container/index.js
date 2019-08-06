'use strict';
const periodic = require('periodicjs');
const logger = periodic.logger;
const fs = require('fs');
const Promisie = require('promisie');
const readFile = Promisie.promisify(fs.readFile);
const writeFile = Promisie.promisify(fs.writeFile);
const exec = require('child_process').exec;
const client_configurations = periodic.settings.container[ 'job-service-container' ].client_configurations;
const AWS = require('aws-sdk');
const THEMESETTINGS = periodic.settings.container[ 'job-service-container' ];

module.exports = () => {
  periodic.app.locals.plaid = periodic.settings.container['job-service-container'].plaid;
  periodic.app.locals.client_configurations = client_configurations;
  let aws_configs = periodic.settings.extensions[ 'periodicjs.ext.packagecloud' ].client;
  periodic.aws = {};
  AWS.config.credentials = new AWS.Credentials(aws_configs.accessKeyId, aws_configs.accessKey, null);
  let s3 = new AWS.S3();
  periodic.aws.s3 = s3;
  periodic.status.on('configuration-complete', (status) => {
    periodic.settings.extensions['periodicjs.ext.reactapp'].user = Object.assign({}, periodic.settings.extensions['periodicjs.ext.reactapp'].user,);
    // logger.silly("periodic.settings.extensions['periodicjs.ext.reactapp']", periodic.settings.extensions['periodicjs.ext.reactapp']);
    readFile('public/container/job-service-container/stylesheet/cis.scss', 'utf8')
    .then(data => {
      let SCSSBreak = data.indexOf('/*Add CSS below this line. Do not add or change anything above this line*/');
      return data.slice(SCSSBreak);
    })
    .then(SCSSdata => {
      return writeFile('public/container/job-service-container/stylesheet/cis.scss', `$primaryColor:${client_configurations.company_color_primary};\n$hoverColor:${client_configurations.company_color_hover};\n$footerColor:${client_configurations.footer.background_color};\n$headerBackgroundTop:${client_configurations.header.header_background_color_fade_top};\n$headerBackgroundBottom:${client_configurations.header.header_background_color_fade_bottom};\n$headerBorderBottom:${client_configurations.header.header_border_bottom};\n` + SCSSdata)
      .then(() => {
        logger.silly('Wrote successfully to cis.scss');
      })
      .catch(err => {
        logger.error('Unable to write to cis.scss file', err);
      });
    })
    .then(() => {
      return exec('npm run sass', (err, stdout, stderr) => {
        if (err) logger.error('Unable to npm run sass', err);
        logger.silly(`stdout: ${stdout}`);
        logger.silly(`stderr: ${stderr}`);
      });
    })
    .catch(err => {
      logger.error('Unable to read from cis.scss file', err);
    });
  });
  return Promise.resolve(true);
};