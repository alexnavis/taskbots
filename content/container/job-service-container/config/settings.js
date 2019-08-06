'use strict';

module.exports = {
  settings: {
    timeout: 20000,
    "microservice": {
    },
    LABELS: {
      login: 'Welcome to DigiFi CIS',
    },
    "client_configurations": {
      "company_favicon": "/favicon.png",
      "company_color_primary": "rgb(21, 147, 255)",
      "company_color_secondary": "rgb(21, 147, 255)",
      "company_color_hover": "#66d2ff",
      "company_logo": "/company_logo.png",
      "blockPageUILayout": {
        "component": "div",
        "children": [
          {
            "component": "Image",
            "props": {
              "src": "/company_logo.png",
              "style": {
                "width": "170px",
                "margin": "0 0 10px 0"
              }
            }
          },
          {
            "component": "Button",
            "props": {
              "className": "__is_loading",
              "buttonStyle": "isOutlined",
              "color": "isWhite",
              "state": "isLoading",
              "size": "isLarge",
              "style": {
                "border": "none"
              },
              "children": "Loading..."
            }
          }
        ]
      },
      "contact": {
        "customer_support": {
          "phone_number": "555-555-1234",
          "email": "info@abclendco.io",
          "office_hours": "9am - 5pm (Monday - Friday)"
        },
        "technical_support": {
          "phone_number": "555-555-1234",
          "email": "info@abclendco.io",
          "office_hours": "9am - 5pm (Monday - Friday)"
        },
        "headquarters": {
          "phone_number": "555-555-1234",
          "email": "info@abclendco.io",
          "office_hours": "9am - 5pm (Monday - Friday)"
        }
      },
      "custom_ui_layout": { "component": "div", "children": [ { "component": "Image", "props": { "src": "/company_logo.png", "style": { "width": "170px", "margin": "0 0 10px 0" } } }, { "component": "Button", "props": { "className": "__is_loading", "buttonStyle": "isOutlined", "color": "isWhite", "state": "isLoading", "size": "isLarge", "style": { "border": "none" }, "children": "Loading..." } } ] },
      "header": {
        "company_color_primary": "#007aff",
        "company_color_secondary": "#007aff",
        "header_background_color_fade_top": "rgb(255,255,255)",
        "header_background_color_fade_bottom": "rgb(255,255,255)",
        "header_primary_text_color": "rgb(0,122,255)",
        "header_button_background_color": "rgb(0,122,255)",
        "header_border_bottom": "none",
        "header_button_text_color": "rgb(255,255,255)",
        "header_hamburger_color": "rgb(0,122,255)",
        "header_shadow": "rgba(0, 0, 0, 0.1) 0px 2px 5px 0px",
      },
      "footer": {
        "disclaimer": "This is the disclaimer",
        "file": "/footer.manifest.js",
        "copyright": "© 2017",
        "company_color_primary": "#007aff",
        "company_color_secondary": "#007aff"
      },
    },
  },
  databases: {},
};