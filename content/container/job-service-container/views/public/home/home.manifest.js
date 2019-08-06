'use strict';

module.exports = {
  'containers': {
    '/': {
      layout:{
        component: 'Hero',
        props:{
          'size':'isFullheight',
        },
        children: [
          {
            component: 'HeroBody',
            children: [
              {
                component: 'Container',
                children:'HOME PAGE',
              },
            ],
          },
        ],
      },
      'resources':{},
      'callbacks': ['func:window.scrollToTop',  ],
      'pageData':{
        'title': '',
        'navLabel': '',
      },
      'onFinish':'render',
    },
  },
};