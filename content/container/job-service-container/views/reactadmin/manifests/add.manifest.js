'use strict';

module.exports = periodic => {
  let reactapp = periodic.app.controller.extension.reactapp;

  return {
    containers: {
      [`/crons/add`]: {
        layout: {
          component: 'Hero',
          children: [
            {
              component: 'ResponsiveForm',
              props: {
                style: {
                  padding: '5%',
                },
                onSubmit: {
                  url:
                    '/crons?format=json&unflatten=true&updateprofile=true&updatecallback=true&handleupload=true&forcequerytobody=true&encryptfiles=true',
                  options: {
                    method: 'POST',
                  },
                  success: true,
                  successCallback: 'func:this.props.hideModal',
                  successProps: 'last',
                  responseCallback: 'func:this.props.refresh',
                  errorCallback: 'func:this.props.createNotification',
                },
                validations: [
                  {
                    name: 'cron_interval',
                    custom_validators: ['checkInterval', ],
                    custom_validator_functions: ['func:window.validateInterval', ],
                    constraints: {
                      cron_interval: {
                        checkInterval: {},
                      },
                    },
                  },
                ],
                flattenFormData: true,
                footergroups: false,
                formgroups: [
                  {
                    formElements: [
                      {
                        label: 'Cron Name',
                        name: 'cron_name',
                      },
                    ],
                  },
                  {
                    formElements: [
                      {
                        label: 'Interval',
                        name: 'cron_interval',
                        validateOnBlur: true,
                        onBlur: 'func:window.populateIntervalDescription',
                        passProps: {
                          required: false,
                        },
                      },
                    ],
                  },
                  {
                    formElements: [
                      {
                        label: 'Interval Description',
                        name: 'cron_interval_description',
                        passProps: {
                          className: '__cron_interval_description',
                          state: 'isDisabled',
                        },
                      },
                    ],
                  },
                  {
                    formElements: [
                      {
                        type: 'file',
                        label: 'Upload Script',
                        name: 'cron_file',
                        layoutProps: {
                          style: {
                            display: 'flex',
                            flexDirection: 'row',
                          },
                        },
                      },
                    ],
                  },
                  {
                    formElements: [
                      {
                        type: 'submit',
                        value: 'Add Cron',
                        passProps: {
                          style: {
                            backgroundColor: 'rgb(0,53,116)',
                            color: 'white',
                            border: 'none',
                            width: '25%',
                          },
                        },
                        layoutProps: {
                          style: {
                            alignSelf: 'center',
                            textAlign: 'center',
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
        resources: {},
        onFinish: 'render',
      },
    },
  };
};
