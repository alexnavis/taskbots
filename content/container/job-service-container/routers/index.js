'use strict';

const periodic = require('periodicjs');
const containerRouter = periodic.express.Router();
const cronRouter = require('./cron');
const reactadminController = periodic.controllers.extension.get('@digifi-los/reactapp').reactapp;


containerRouter.use('/cron', cronRouter);

containerRouter.get('/*', reactadminController.index);

module.exports = containerRouter;