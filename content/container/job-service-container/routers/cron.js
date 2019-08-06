'use strict';

const periodic = require('periodicjs');
const cronRouter = periodic.express.Router();
const controllers = require('../controllers');
const isClientAuthenticated = periodic.controllers.extension.get('periodicjs.ext.oauth2server').auth.isClientAuthenticated;
const cronController = controllers.cron(periodic);
const transformController = controllers.transform;
let RAHelper = periodic.controllers.extension.get('@digifi-los/reactapp').helper;



cronRouter.get('/indexPage',
  transformController.pretransform,
  cronController.getAllCrons,
  transformController.posttransform,
)

cronRouter.get('/editPage/:id',
  transformController.pretransform,
  cronController.getCronById,
  transformController.posttransform,
)

cronRouter.put('/:id',
  transformController.pretransform,
  cronController.updateCronDetail,
  transformController.posttransform,
)

cronRouter.post('/setactive/:id/:status',
  transformController.pretransform,
  cronController.getCronById,
  cronController.updateCronStatus,
  cronController.updateCron,
  transformController.posttransform,  
)

cronRouter.get('/addPage',
  transformController.pretransform,
  cronController.getAllOrganizations,
  transformController.posttransform,
)

cronRouter.post('/addCron',
  RAHelper.handleFileUpload,
  RAHelper.handleFileAssets,
  RAHelper.fixCodeMirrorSubmit,
  RAHelper.fixFlattenedSubmit,
  cronController.setCronFilePath,
  cronController.createCrons,
  (req, res, next) => {
    return res.status(200).send({
      status: 200,
      response: 'success',
      successCallback: 'func:this.props.hideModal',
    });
  }
)

cronRouter.delete('/:id',
  transformController.pretransform,
  cronController.deleteCron,
  transformController.posttransform,
)

cronRouter.post('/:id/run',
  cronController.getCronById,
  cronController.runCron,
)

cronRouter.use(cronController.sendResponse)

module.exports = cronRouter