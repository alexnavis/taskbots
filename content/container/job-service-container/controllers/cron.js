'use strict';
const Promisie = require('promisie');
const CronJob = require('cron').CronJob;
const path = require('path');
const fs = require('fs-extra');
const crypto = require('crypto');
const async = require('async');
const http = require('http');
const https = require('https');
const cronstrue = require('cronstrue');
const promisifiedRemove = Promisie.promisify(fs.remove);
const cronMap = {};

var mongoose,
  Asset,
  Cron,
  Organization,
  logger,
  pemfile,
  periodic,
  cloudUploads,
  downloadCron,
  appenvironment,
  appSettings,
  validateTheme;
const cronPath = path.resolve(process.cwd(), 'content/files/crons');
  
  /**
 * sets the file path for the new cron
 * @param  {Object} req Express request object
 * @param {String} cronPath local path of cron
 * @param  {Object} res Express response object
 * @param  {Function} next Express next method
 */
var setCronFilePath = function(req, res, next) {
  req.localuploadpath = cronPath;
  req.body['existing-file-name'] = true;
  req.controllerData = req.controllerData || {};
  req.controllerData.encryptfiles = true;
  next();
};

var createCronJob = function (cronData) {
  let assetData = cronData.asset;
  let modulePath = path.join(cronPath, assetData.attributes.periodicFilename);
  const cronScript = require(modulePath);
  const options = { organization: cronData.organization, cron_name: cronData.name, };
  let fn = cronScript && cronScript.script ? require(modulePath).script(periodic, options).bind(null, Object.assign({}, cronData.runtime_options)) : null;
  if (fn) {
    let task = new CronJob({
      cronTime: cronData.cron_interval,
      onTick: fn,
      onComplete: function () {},
      start: false,
    });
    task.addCallback(function () {
      Cron.model.updateOne({ _id: cronData._id, }, { $set: { lastran: new Date(), }, })
        .then(() => {})
        .catch((e) => logger.warn('error updating cron', e));
    });
    return task;
  } else {
    return null;
  }
};

async function findCronsForInitialization(crons, cb) {
  if (crons) {
    return crons;
  } else {
    const query = (typeof validateTheme === 'string')
      ? {
        $and: [ {
          active: true,
        }, {
          theme: validateTheme,
        }, ],
      }
      : {
        active: true,
      };
    return await Cron.model.find(query).populate('asset').lean();
  }
};

var decryptHTTPStream = function (options, cb) {
  return new Promise((resolve, reject) => {
    try {
        https.get(options.url, function(https_download_response) {
            // var decipher = crypto.createDecipher(options.algorithm || 'aes192', '');
            https_download_response.pipe(options.writeStream || options.res);
            https_download_response.on('end', () => {
                return resolve({
                    result: 'success',
                    data: {
                        message: 'download complete'
                    }
                });
            });
            https_download_response.on('error', e => {
                return reject(e);
            });
        });
    } catch (e) {
        return reject(e);
    }
  })
};

async function downloadRemoteFiles(crons) {
  try {
    let remoteFiles = crons.filter(cron => cron.asset.locationtype !== 'local');
    if (remoteFiles.length) {
      return await Promise.all(remoteFiles.map(async (cron) => {
        const asset = cron.asset;
        const filename = asset && asset.attributes && asset.attributes.periodicFilename ? asset.attributes.periodicFilename : asset.name;
        let filepath = path.join(cronPath, filename)
        let writeStream = fs.createWriteStream(filepath);
        writeStream.on('finish', function () {
          logger.silly('done writing');
        });
        await decryptHTTPStream({
          url: asset.fileurl,
          algorithm: asset.attributes.client_encryption_algo,
          writeStream: writeStream,
        });
      }))
    } else {
      return crons;
    }
  }	catch (e) {
    return e;
  }
};

async function initializeCrons(crons, cb) {
  try {
    const cronsToInitialize = await findCronsForInitialization(crons);
    const promiseEnsureDir = Promisie.promisify(fs.ensureDir);
    const ensureResults = await promiseEnsureDir(cronPath);
    const remoteFiles = await downloadRemoteFiles(cronsToInitialize);
    const cronJobs = [];
    cronsToInitialize.forEach((cron) => {
      const modulePath = path.join(cronPath, cron.asset.attributes.periodicFilename);
      try { 
        const fileStats = fs.statSync(modulePath, 'utf8');
        if (fileStats.isFile()) {
          const file = fs.readFileSync(modulePath, 'utf8');
          cronJobs.push(cron);
        }
      } catch (e) {
        if (e) {
          cronJobs.push(false);
        }
      }
    })

    if (Array.isArray(cronJobs)) {
      cronJobs.forEach(cron => {
        if (cron && cron.active) {
          let task = createCronJob(cron);
          if (task) {
            task.start();
            cronMap[cron._id] = {
              task: task,
              cron: cron,
            };
          }
        }
      });
    }
    if (typeof cb === 'function') {
      cb(null, cronJobs);
    }
  } catch (e) {
    logger.warn('Error starting crons', e);
    if (typeof cb === 'function') {
      cb(e);
    }
  }
};

async function findCronDiff(map, cb) {
  let currentCrons = Object.keys(map);
  let query = {
    $and: [{
      active: true,
    }, {
      _id: { $nin: currentCrons, },
    }, ],
  };
  if (typeof validateTheme === 'string') {
    query.$and.push({
      theme: validateTheme,
    });
  }
  return await Cron.model.find(query).populate('asset').lean();
};

async function digestCrons(modified, cb) {
  try {
    let skipDigest;
    logger.silly('Updating crons');
    const diffCrons = await findCronDiff(cronMap);
    await initializeCrons(diffCrons);
    if (Array.isArray(modified) && modified.length) {
      await Promise.all(modified.map(async cron => {
        if (cron.status === false && cronMap[ cron.id ]) {
          if (cronMap[ cron.id ].cron && cronMap[ cron.id ].cron.title) {
            await promisifiedRemove(path.join(cronPath, cronMap[ cron.id ].cron.title));
          }
          cronMap[ cron.id ].task.stop();
          cronMap[ cron.id ] = null;
          delete cronMap[ cron.id ];
        }
      }));
    }
 } catch(e) {
  logger.warn('Error digesting cron', e);
 }
};

var useCronTasks = function () {
  try {
    // if (periodic.app.controller.extension.cron_service.settings.cron_check_file_enabled) {			
    logger.silly('Initialzing crons');
    initializeCrons(null, function (err) {
      if (err) {
        logger.error('Could not start crons', err);
      } else {
        logger.silly('Crons initialized');
      }
    });
    // } else {
    //   logger.silly('Not initialzing crons');
    // }
  }	catch (e) {
    logger.warn('Error calling useCronTasks', e);
  }
};

/**
 *
 * Checks file type of new cron
 * @param {String} mime file type
 * @returns true if file type is valid, flase if not
 */
const jsMimeTest = function(mime) {
  return mime === 'application/javascript' || mime === 'text/javascript' || mime === 'application/x-javascript';
};

/**
 * Utility function for generating a file signature
 * @param  {Object}   options Options for the function
 * @param {string} options.filePath Path to the file that the signature is for
 * @param {string} options.encoding Encoding of the file that the signature is being generated for
 * @param {string} options.file File data that is passed through to the callback function
 * @param  {Function} cb      Callback function
 */
var createFileSignatures = function(options, cb) {
  try {
    Promisie.promisify(fs.readFile)(options.filePath, options.encoding || 'utf8').then(
      filedata => {
        let signData = new Buffer(filedata.trim()).toString('base64');
        let sign = crypto.createSign('RSA-SHA256');
        sign.update(signData);
        //pemfile is a .pem file used in generating the signature that is read at initialization and held in memory
        let signature = sign.sign(pemfile, 'hex');
        cb(null, {
          file: options.file,
          signature: signature,
        });
      },
      e => {
        cb(e);
      }
    );
  } catch (e) {
    cb(e);
  }
};

const createCrons = async (req, res, next) => {
  try {
    let files = Array.isArray(req.controllerData.files) ? req.controllerData.files : [ req.controllerData.files, ];
    //Tests that files are a javascript mimetype
    let javascriptFiles = files.filter(file => jsMimeTest(file.mimetype));
    if (javascriptFiles.length) {
      //Converts asset data into an object that is compatible with downloadRemoteFiles function
      let filesForDownload = javascriptFiles.map(filedata => {
        return {
          locationtype: 'amazon',
          asset: filedata,
        };
      });
      // await downloadRemoteFiles(filesForDownload);
      const filedatas = javascriptFiles.map(file => ({
        filePath: path.join(cronPath, file.name),
        file: file,
      }))
      const readytocreate = filedatas.map(async filedata => {
        const associatedAsset = await Asset.model.findOne({
          'attributes.periodicFilename': filedata.file.name,
        });
        let rb = req.body;
        return {
          title: filedata.file.name,
          name: req.body.cron_name,
          content: 'cron',
          asset: associatedAsset._id,
          description: req.body.description || '',
          organization: req.body.organization_id,
          cron_interval: req.body.cron_interval || '00 00 00 * * *',
          interval_description: req.body.cron_interval !== 'undefined' ? cronstrue.toString(req.body.cron_interval) : undefined,
          runtime_options: JSON.parse(req.body.runtime_options || '{}'),
        };
      });
      const crons = await Promise.all(readytocreate);
      const createdCrons = await Promise.all(
        crons.map(cron => {
          return Cron.create(cron);
        })
      );
      //Removes temporary cron files from cron directory
      await Promise.all(
        createdCrons.map(cron => {
          return promisifiedRemove(path.join(cronPath, cron.title));
        })
      );
      next();
    }
  } catch (err) {
    return res.status(400).send({
      'message': err
    })
  }
};

var getCronMap = function(){
  return cronMap;
};

async function getAllCrons(req, res, next) {
  try {
    req.controllerData = req.controllerData || {};
    req.controllerData.crons = await Cron.model.find({}).populate('organization').lean();
    next();
  } catch (error) {
    logger.warn(error.message);
    res.status(400).send({ error });
  }
}

async function createCron(req, res, next) {
  try {
    req.controllerData = req.controllerData || {};
  } catch (error) {
    logger.warn(error.message);
    res.status(400).send({ error });
  }
}

async function deleteCron(req, res, next) {
  try {
    req.controllerData = req.controllerData || {};
    const modifiedCron = [{
      id: req.params.id,
      status: false,
    }];
    await digestCrons(modifiedCron);
    let deleteCron = await Cron.model.deleteOne({ _id: req.params.id });
    next();
  } catch (error) {
    logger.warn(error.message);
    res.status(400).send({ error });
  }
}

async function runCron(req, res, next) {
  try {
    req.controllerData = req.controllerData || {};
    const cron = req.controllerData.cron;
    const asset = await Asset.model.findOne({ _id: cron.asset.toString() }).lean();
    if (asset) cron.asset = asset;
    await downloadRemoteFiles([cron]);
    const fnPath = path.join(cronPath, asset.attributes.periodicFilename);
    const options = { organization: cron.organization, cron_name: cron.name, }
    require(fnPath).script(periodic, options)(Object.assign({}, cron.runtime_options));
    await promisifiedRemove(path.join(cronPath, asset.attributes.periodicFilename));
    return next();
  } catch (error) {
    logger.warn('Error running cron: ', error.message);
    res.status(400).send({ error });
  }
}

async function sendResponse(req, res, next) {
  try {
    req.controllerData = req.controllerData || {};
    res.status(200).send(req.controllerData);
  } catch (error) {
    logger.warn(error.message);
    res.status(400).send({ error });
  }
}

async function getAllOrganizations(req, res, next) {
  try {
    req.controllerData = req.controllerData || {};
    req.controllerData.organizations = await Organization.model.find({}).lean();
    next();
  } catch (error) {
    logger.warn(error.message);
    res.status(400).send({ error });
  }
}

async function getCronById(req, res, next) {
  try {
    req.controllerData = req.controllerData || {};
    let cronID = req.params.id;
    req.controllerData.cron = await Cron.model.findOne({ _id: cronID }).lean();
    next();
  } catch (error) {
    logger.warn(error.message);
    res.status(400).send({ error });
  }
}

async function updateCronStatus(req, res, next) {
  try {
    req.controllerData = req.controllerData || {};
    let status = (req.params.status === 'false') ? true : false;
    req.controllerData.cron.active = status;
    let cron = req.controllerData.cron;
    next();
  } catch (error) {
    res.status(400).send({ error });
  }
}

async function updateCron(req, res, next) {
  try {
    req.controllerData = req.controllerData || {};
    let updatedCron = await Cron.model.updateOne({ _id: req.params.id }, { $set: req.controllerData.cron });
    const modifiedCron = [{
      id: req.controllerData.cron._id.toString(),
      status: req.controllerData.cron.active,
    }];
    await digestCrons(modifiedCron);
    next();
  } catch (error) {
    logger.warn(error.message);
    res.status(400).send({ error });
  }
}

async function updateCronDetail(req, res, next) {
  try {
    req.controllerData = req.controllerData || {};
    const interval_description = req.body.cron_interval !== 'undefined' ? cronstrue.toString(req.body.cron_interval) : undefined;
    req.body.interval_description = interval_description ? interval_description : '';
    let updatedCron = await Cron.model.updateOne({ _id: req.params.id }, { $set: req.body });
    next();
  } catch (error) {
    logger.warn(error.message);
    res.status(400).send({ error });
  }
}

var initialize = function (resources) {
  periodic = resources;
  appSettings = resources.settings;
  logger = resources.logger;
  mongoose = resources.mongoose;
  Cron = periodic.datas.get('standard_cron');
  Organization = periodic.datas.get('standard_organization');
  Asset = periodic.datas.get('standard_asset');
  let pempath = path.join(__dirname, '../../../../otherdocs/cloud-digifi.pem');
  pemfile = fs.readFileSync(pempath, 'utf8');
  appenvironment = appSettings.application.environment;
  useCronTasks();
  return {
    setCronFilePath,
    getAllCrons,
    createCron,
    createCrons,
    updateCron,
    deleteCron,
    runCron,
    sendResponse,
    getAllOrganizations,
    getCronById,
    updateCronStatus,
    updateCronDetail,
  };
};

module.exports = initialize;