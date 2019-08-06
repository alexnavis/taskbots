'use strict';
module.exports = {
  title: 'Run Cron',
  textContent: [
    {
      component: 'p',
      props: {
        style: {
          textAlign: 'left',
        },
      },
      children: 'Are you sure you want to run this cron?',
    },
  ],
  yesButtonText: 'Run',
  yesButtonProps: {
    style: {
      marginTop: '5%',
      marginRight: '5%',
      width: '20%',
    },
    buttonProps: {
      color: 'isPrimary',
    },
  },
  noButtonText: 'Cancel',
  noButtonProps: {
    style: {
      marginTop: '5%',
      width: '20%',
    },
    buttonProps: {
      color: 'isPrimary',
    },
  },
};
