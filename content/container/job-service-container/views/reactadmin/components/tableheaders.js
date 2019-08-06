'use strict';
const path = require('path');
const data_tables = require(path.join(process.cwd(), 'node_modules/@mariner/periodicjs.ext.reactadmin/utility/data_tables'));
const tableHeader = [
  data_tables.tableField({
    title: 'ObjectId',
    field: '_id',
    link: true,
    headerStyle: {
      maxWidth: 150,
      // overflow: 'hidden',
      // textOverflow: 'ellipsis',
    },
    columnStyle: {
      maxWidth: 150,
      // overflow: 'hidden',
      // textOverflow: 'ellipsis',
    },
  }),
  data_tables.tableCreatedDate,
  data_tables.tableField({
    title: 'Hostname',
    field: 'hostname',
  }),
  data_tables.tableField({
    title: 'Level',
    field: 'level',
  }),
  data_tables.tableField({
    title: 'Message',
    field: 'msg',
    headerStyle: {
      maxWidth: 150,
      // overflow: 'hidden',
      // textOverflow: 'ellipsis',
    },
    columnStyle: {
      maxWidth: 150,
      // overflow: 'hidden',
      // textOverflow: 'ellipsis',
    },
  }),
  data_tables.tableOptions,
];
