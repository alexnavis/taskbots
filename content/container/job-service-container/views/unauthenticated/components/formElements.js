'use strict';

module.exports = function(options) {
  function getInputElement(formElement) {
    return Object.assign(
      {
        type: 'text' || formElement.type,
        label: `${formElement.label}`,
        name: `${formElement.name || formElement.label}`,
        layoutProps: {
          // horizontalform: true,
          className: '__form_element_wrapper',
          style: {
            // display: 'flex',
            // flexDirection: 'row',
          },
        },
        labelProps: {
          className: '__cron_form_label',
          style: {
            whiteSpace: 'nowrap',
            textAlign: 'left',
            zIndex: 1,
            paddingRight: '20px',
          },
        },
        passProps: {},
      },
      formElement
    );
  }

  if (options.twoColumns === true) {
    if (options.doubleCard) {
      return {
        leftDoubleCardColumn: {
          style: {
            display: 'flex',
          },
        },
        rightDoubleCardColumn: {
          style: {
            display: 'flex',
          },
        },
        formGroupCardLeft: options.left.map(label => {
          return getInputElement(label);
        }),
        formGroupCardRight: options.right.map(label => {
          return getInputElement(label);
        }),
      };
    } else {
      return {
        formGroupElementsLeft: options.left.map(label => {
          return getInputElement(label);
        }),
        formGroupElementsRight: options.right.map(label => {
          return getInputElement(label);
        }),
      };
    }
  } else {
    return {
      formGroupElements: options.labels.map(label => {
        return getInputElement(label);
      }),
    };
  }
};
