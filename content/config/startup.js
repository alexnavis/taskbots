'use strict';
const helmet = require('helmet');
const bodyParser = require('body-parser');
const os = require('os');
/**
 * this function is used to add additional customizations to the express application before the express server starts. The function is bound with the periodic singleton instance
 * 
 * @returns 
 */
function customExpressConfiguration() {

  return new Promise((resolve, reject) => {
    try {
      const env = this.settings.application.environment;
      const permittedCSP = ['\'self\'',
        // '\'unsafe-inline\'',
        // '\'unsafe-eval\'',
        'https://s.pinimg.com/ct/core.js', '*.digifi.cc', '*.promisefinancial.net', '*.digifi.io', '*.google.com', '*.facebook.com', '*.facebook.net', '*.twitter.com', '*.addthis.com', '*.googleadservices.com', '*.doubleclick.net', '*.google-analytics.com', 'promisefinancial.evyy.net', '*.youtube.com', '*.plaid.com', '*.newrelic.com', '*.facebook.net', 's3-us-west-2.amazonaws.com', 'bam.nr-data.net', 'data:', 'd3cxv97fi8q177.cloudfront.net', 'd33wwcok8lortz.cloudfront.net', 'tapestry.tapad.com', 'd33wwcok8lortz.cloudfront.net', 'www.ojrq.net', '*.yodlee.com', '*.pinterest.com', '*.yodleeinteractive.com', '*.zopim.com', '*.zopim.io', '*.googleapis.com', 'wss://*.zopim.com', '*.eoriginal.com',];
      const cspOptions = {
        directives: {
          defaultSrc: permittedCSP,
          reportUri: '/report-violation',
          //objectSrc: [] // An empty array allows nothing through
        },
        // Set to true if you only want browsers to report errors, not block them
        reportOnly: true,
        // Set to true if you want to blindly set all headers: Content-Security-Policy,
        // X-WebKit-CSP, and X-Content-Security-Policy.
        setAllHeaders: false,
        // Set to true if you want to disable CSP on Android where it can be buggy.
        disableAndroid: true,
        // Set to false if you want to completely disable any user-agent sniffing.
        // This may make the headers less compatible but it will be much faster.
        // This defaults to `true`.
        browserSniff: true,
      };
      const ninetyDaysInMilliseconds = 7776000000;      
      this.app.use(helmet.frameguard({ action: 'sameorigin', }));
      this.app.use(helmet.hidePoweredBy());
      this.app.use(helmet.ieNoOpen());
      this.app.use(helmet.noSniff());
      this.app.use(helmet.xssFilter());
      this.app.use(helmet.hsts({
        maxAge: ninetyDaysInMilliseconds,     // Must be at least 18 weeks to be approved by Google
        includeSubDomains: true, // Must be enabled to be approved by Google
        preload: true,
      }));
      const helmetCSP = helmet.contentSecurityPolicy(cspOptions);
      // this.app.use(helmetCSP);
      this.app.post('/report-violation',
      bodyParser.json({
        type: ['json', 'application/csp-report',],
      }), (req, res) => {
        let userdata = {};
        if (req && req.user && req.user.email) {
          userdata = {
            email:req.user.email,
            username:req.user.username,
            firstname:req.user.firstname,
            lastname:req.user.lastname,
          };
        }
        if (req.body) {
          this.logger.warn('CSP Violation: ', {
            reqBody:req.body,
            ipinfo:{
              date: new Date(),
              'x-forwarded-for': req.headers['x-forwarded-for'],
              remoteAddress: req.connection.remoteAddress,
              originalUrl: req.originalUrl,
              headerHost: req.headers.host,
              userAgent: req.headers['user-agent'],
              referer: req.headers.referer,
              user: userdata,
              osHostname: os.hostname(),
            },
          });
        } else {
          this.logger.error('CSP Violation: No data received!');
        }
        res.status(204).end();
      });

      this.logger.exitOnError = false;
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  customExpressConfiguration,
};