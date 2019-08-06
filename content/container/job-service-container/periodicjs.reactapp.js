'use strict';

module.exports = {
  "periodicjs_ext_reactapp": {
    "manifests": [
    ],
    "unauthenticated_manifests": [
      '/content/container/job-service-container/views/public/home',
      '/content/container/job-service-container/views/unauthenticated/manifests/add.manifest.js',
      '/content/container/job-service-container/views/unauthenticated/manifests/edit.manifest.js',
      '/content/container/job-service-container/views/unauthenticated/manifests/index.manifest.js'
    ],
    // 'navigation': '/content/container/job-service-container/views/shared/navigation.manifest.js',
    'components': {
      // 'login': '/content/container/job-service-container/utilities/views/public/home/component/login.js',
      // 'main': {
      //   'header': '/content/container/job-service-container/views/shared/header.manifest.js',
      //   'login': '/content/container/job-service-container/views/shared/header.manifest.js',
      //   'footer': '/content/container/job-service-container/views/shared/footer.manifest.js',
      // },
      'error': {
        '404': '/content/container/job-service-container/views/public/error/404.manifest.js',
      },
    },
  }
}