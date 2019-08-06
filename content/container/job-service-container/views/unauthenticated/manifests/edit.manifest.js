'use strict';
const path = require('path');
const deleteModal = require('../components/deleteModal');
const formElements = require('../components/formElements');
module.exports = periodic => {

  return {
    containers: {
      [`/views/crons/edit/:id`]: {
        pageData: {
          title: 'Cron Service',
          navLabel: 'Cron Service',
        },
        layout: {
          component: 'Hero',
          props: {
            size: 'isFullheight',
          },
          children: [
            {
              component: 'HeroBody',
              props: {},
              children: [
                {
                  component: 'Container',
                  props: {
                    style: {
                      paddingTop: '50px',
                    },
                  },
                  children: [
                    {
                      component: 'Columns',
                      children: [
                        {
                          component: 'Column',

                          children: [
                            {
                              component: 'ResponsiveForm',
                              props: {
                                onSubmit: {
                                  url: '/cron/:id',
                                  options: {
                                    method: 'PUT',
                                  },
                                  params: [{ key: ':id', val: '_id', }, ],
                                  success: true,
                                  successCallback: 'func:this.props.refresh',
                                },
                                hiddenFields: [
                                  // {
                                  //   form_name: 'docid',
                                  //   form_val: '_id',
                                  // },
                                ],
                                flattenFormData: true,
                                formgroups: [
                                  {
                                    formElements: [
                                      {
                                        type: 'layout',
                                        value: {
                                          component: 'Title',
                                          props: {
                                            className: '__form_title',
                                            style: {
                                              fontWeight: 'bold',
                                              fontSize: 22,
                                              marginLeft: '12px',
                                            },
                                          },
                                          children: 'Crons',
                                        },
                                      },
                                      {
                                        type: 'submit',
                                        value: 'Save',
                                        thisprops: {
                                          onclickPropObject: ['formdata', ],
                                        },
                                        passProps: {
                                          style: {
                                            backgroundColor: 'rgb(0,53,116)',
                                            color: 'white',
                                            padding: '0 62px',
                                            border: 'none',
                                          },
                                        },
                                        layoutProps: {
                                          style: {
                                            textAlign: 'right',
                                          },
                                          className: '__form_buttons',
                                        },
                                      },
                                      {
                                        type: 'layout',
                                        layoutProps: {
                                          style: {
                                            textAlign: 'right',
                                          },
                                          className: '__form_buttons',
                                        },
                                        value: {
                                          component: 'ResponsiveButton',
                                          thisprops: {
                                            onclickPropObject: ['formdata', ],
                                          },
                                          props: {
                                            onClick: 'func:this.props.fetchAction',
                                            onclickBaseUrl: '/cron/:id/run',
                                            onclickLinkParams: [{ key: ':id', val: '_id', }, ],

                                            style: {
                                              padding: '0 65px',
                                            },
                                            fetchProps: {
                                              method: 'POST',
                                            },
                                            buttonProps: {
                                              size: 'isSuccess',
                                            },
                                            successProps: {
                                              successCallback: 'func:this.props.refresh',
                                              success: {
                                                notification: {
                                                  text: 'Successfully Running Cron',
                                                  type: 'success',
                                                  timeout: 2000,
                                                },
                                              },
                                            },
                                          },
                                          children: 'Run',
                                        },
                                      },
                                      {
                                        type: 'layout',
                                        layoutProps: {
                                          style: {
                                            textAlign: 'right',
                                          },
                                          className: '__form_buttons',
                                        },
                                        value: {
                                          component: 'ResponsiveButton',
                                          thisprops: {
                                            onclickPropObject: ['formdata', ],
                                          },
                                          props: {
                                            onClick: 'func:this.props.fetchAction',
                                            onclickBaseUrl: '/cron/:id',
                                            onclickLinkParams: [{ key: ':id', val: '_id', }, ],
                                            style: {
                                              padding: '0 58px',
                                            },
                                            fetchProps: {
                                              method: 'DELETE',
                                            },
                                            successProps: {
                                              success: {
                                                notification: {
                                                  text: 'Deleted',
                                                  type: 'success',
                                                  timeout: 1000,
                                                },
                                              },
                                              successCallback: 'func:this.props.reduxRouter.push',
                                              location: '/extension/crons',
                                            },
                                            buttonProps: {
                                              size: 'isDanger',
                                            },
                                            confirmModal: deleteModal,
                                          },
                                          children: 'Delete',
                                        },
                                      },
                                      {
                                        type: 'layout',
                                        layoutProps: {
                                          style: {
                                            textAlign: 'right',
                                          },
                                          className: '__form_buttons',
                                        },
                                        value: {
                                          component: 'ResponsiveButton',
                                          thisprops: {
                                            onclickPropObject: ['formdata', ],
                                          },
                                          props: {
                                            onClick: 'func:this.props.fetchAction',
                                            onclickBaseUrl: '/cron/setactive/:id/:status',
                                            onclickLinkParams: [{ key: ':id', val: '_id', }, { key: ':status', val: 'active', }, ],
                                            style: {
                                              padding: '0 52.5px',
                                            },
                                            fetchProps: {
                                              method: 'POST',
                                            },
                                            buttonProps: {
                                              size: 'isInfo',
                                            },
                                            successProps: {
                                              success: true,
                                              successCallback: 'func:this.props.refresh',
                                            },
                                          },
                                          children: 'Activate',
                                        },
                                      },
                                    ],
                                  },
                                  {
                                    card: {
                                      twoColumns: true,
                                      props: {
                                        cardTitle: 'Crons',
                                      },
                                    },
                                    formElements: [
                                      formElements({
                                        twoColumns: true,
                                        doubleCard: false,
                                        left: [
                                          {
                                            label: 'Name',
                                            name: 'name',
                                            passProps: {
                                              style: {
                                                width: '250px',
                                                right: 0,
                                              },
                                              className: '__cron_form_input',
                                            },
                                          },
                                          {
                                            label: 'Active',
                                            name: 'active',
                                            passProps: {
                                              state: 'isDisabled',
                                              style: {
                                                width: '250px',
                                                right: 0,
                                              },
                                              className: '__cron_form_input',
                                            },
                                          },
                                          {
                                            label: 'Author',
                                            name: 'author',
                                            passProps: {
                                              state: 'isDisabled',
                                              style: {
                                                width: '250px',
                                                right: 0,
                                              },
                                              className: '__cron_form_input',
                                            },
                                          },
                                          {
                                            label: 'Created At',
                                            name: 'createdat',
                                            passProps: {
                                              state: 'isDisabled',
                                              style: {
                                                width: '250px',
                                                right: 0,
                                              },
                                              className: '__cron_form_input',
                                            },
                                          },

                                          {
                                            label: 'Updated At',
                                            name: 'updatedat',
                                            passProps: {
                                              state: 'isDisabled',
                                              style: {
                                                width: '250px',
                                                right: 0,
                                              },
                                              className: '__cron_form_input',
                                            },
                                          },
                                        ],
                                        right: [
                                          {
                                            label: 'Interval',
                                            name: 'cron_interval',
                                            onBlur: 'func:window.populateIntervalDescription',
                                            passProps: {
                                              style: {
                                                width: '250px',
                                                right: 0,
                                              },
                                              className: '__cron_form_input',
                                            },
                                          },

                                          {
                                            label: 'Interval Description',
                                            name: 'interval_description',
                                            passProps: {
                                              className: '__cron_interval_description',
                                              state: 'isDisabled',
                                              style: {
                                                width: '250px',
                                                right: 0,
                                              },
                                            },
                                          },
                                          {
                                            label: 'Last Ran',
                                            name: 'last_ran',
                                            passProps: {
                                              className: '__cron_last_ran __cron_form_input',
                                              state: 'isDisabled',
                                              style: {
                                                width: '250px',
                                                right: 0,
                                              },
                                            },
                                          },
                                          {
                                            label: 'Next Run',
                                            name: 'next_run',
                                            passProps: {
                                              className: '__cron_form_input',
                                              state: 'isDisabled',
                                              style: {
                                                width: '250px',
                                                right: 0,
                                              },
                                            },
                                          },
                                        ],
                                      }),
                                    ],
                                  },
                                  {
                                    gridProps: {
                                      style: {
                                        marginTop: 30,
                                        padding: 10,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                      },
                                    },
                                  },
                                  {
                                    card: {
                                      props: {
                                        cardTitle: 'Code',
                                      },
                                    },
                                    formElements: [
                                      {
                                        type: 'code',
                                        name: 'code',
                                        passProps: {
                                          state: 'isDisabled',
                                        }
                                      },
                                    ],
                                  },
                                ],
                              },
                              asyncprops: {
                                formdata: ['crondata', 'cron', ],
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        resources: {
          crondata: `/cron/editPage/:id`,
        },
        onFinish: 'render',
      },
    },
  };
};
