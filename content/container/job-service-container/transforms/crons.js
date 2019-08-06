'use strict';

async function formatIndexPage(req) {
  try {
    req.controllerData = req.controllerData || {};
    req.controllerData.crons = req.controllerData.crons.map(cron => {
      cron.organization_name = cron.organization.name;
      return cron;
    }) 

    return req;
  } catch(e) {
    return e.message;
  }
}

async function formatAddPage(req) {
  req.controllerData = req.controllerData || {};
  let organizations = req.controllerData.organizations;
  req.controllerData._children = [
    {
      component: 'ResponsiveForm',
      props: {
        style: {
          padding: '5%',
        },
        onSubmit: {
          url:
            '/cron/addCron',
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
            custom_validators: [ 'checkInterval', ],
            custom_validator_functions: [ 'func:window.validateInterval', ],
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
                'layoutProps': {
                  'horizontalform': false,
                },
                'type': 'dropdown',
                'label': 'Organization',
                passProps: {
                  selection: true,
                  fluid: true,
                },
                'name': 'organization_id',
                validateOnChange: true,
                errorIconRight: true,
                value: organizations[0]._id,
                'options': organizations.map(org => {
                  return {
                    label: org.name,
                    value: org._id
                  }
                })
              },
            ],
          },
          {
            formElements: [
              {
                label: 'Cron Description',
                name: 'description',
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
  ]; 
  return req;
}


module.exports = {
  formatIndexPage,
  formatAddPage
}