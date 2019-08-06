'use strict';
module.exports = {
  title: 'Delete Cron',
  textContent: [
    {
      component: 'p',
      props: {
        style: {
          textAlign: 'left',
        },
      },
      children: 'Are you sure you want to delete this cron?',
    },
  ],
  yesButtonText: 'Delete',
  yesButtonProps: {
    style: {
      marginTop: '5%',
      marginRight: '5%',
      width: '20%',
    },
    buttonProps: {
      color: 'isDanger',
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
