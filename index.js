#!/usr/bin/env node
const check = require('./src/check');

require('yargs')
  .command('check <url> <elementQuery>', 'navigate to url to find element on page', (yargs) => {
    yargs
      .positional('url', {
        describe: 'an aboslute url',
        type: 'string'
      })
      .positional('elementQuery', {
        describe: 'an element query string',
        type: 'string'
      })
  }, ({ url, elementQuery }) => {
    check(url, elementQuery);
  })
  .argv