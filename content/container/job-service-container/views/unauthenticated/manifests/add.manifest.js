'use strict';

module.exports = periodic => {

  return {
    containers: {
      [`/views/crons/add`]: {
        layout: {
          component: 'Hero',
          asyncprops: {
            _children: ['organizationData', '_children']
          }
        },
        resources: {
          organizationData: '/cron/addPage'
        },
        onFinish: 'render',
      },
    },
  };
};
