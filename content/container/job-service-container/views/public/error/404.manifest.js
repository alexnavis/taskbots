'use strict';

module.exports = {
  'layout': {
    'component': 'Section',
    'children': [
      {
        'component': 'Container',
        'props': {
          'hasTextCentered': true,
          'style': {
            marginTop: 120,
            marginBottom: 120,
            paddingLeft: '15%',
            paddingRight: '15%',
          },
        },
        'children':[{
          'component': 'div',
          'props': {},
          'children': [{
            'component': 'Title',
            'props': {
              'size': 'is2',
              'style': {
                'fontWeight': 'normal',
                'color': 'black',
              },
            },
            'children': '404 Error',
          },
          {
            'component': 'hr',
            'props': {
              'style': {
                'opacity': '0.25',
                'margin': '1.5rem 0',
              },
            },
          },
          {
            'component': 'Subtitle',
            'props': {
              'size': 'is4',
              'style': {
                'margin': '1.5rem 0',
                'fontWeight': 'normal',
                'color': 'black',
              },
            },
            'children': 'The page cannot be found',
          },
          ],
        }, ],
      }, ],
  },
  'resources': {
    // "healthcheckStatus":"/r-admin/load/healthcheck"
  },
  'callbacks': ['func:window.scrollToTop', ],
  'onFinish':'render',
  'pageData':{
    'title':'Page Not Found',
    'navLabel':'Error Page Not Found',
  },
};