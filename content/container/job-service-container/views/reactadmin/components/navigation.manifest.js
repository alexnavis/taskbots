'use strict';
module.exports = (periodic) => {
  let reactadmin = periodic.app.controller.extension.reactadmin;
  return {
    "wrapper": {
      "style": {}
    },
    "container": {
      "style": {}
    },
    "layout": {
      "component": "Menu",
      "props": {
        "style": {}
      },
      "children": [
        {
          component: "SubMenuLinks",
          children: [
            {
              "component": "MenuLabel",
              "children": "Cron Service"
            },
            {
              "component": "MenuAppLink",
              "props": {
                "href": `${reactadmin.manifest_prefix}extension/crons/standard`,
                "label": "Cron Service",
                "id": "cron_service-crons"
              }
            },
          ],
        },
      ]
    }
  };
};