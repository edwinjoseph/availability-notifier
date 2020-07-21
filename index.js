#!/usr/bin/env node
const { execSync } = require('child_process');
const check = require('./src/check');

require('yargs')
  .command('$0 <url> <elementQuery>', 'navigate to url to find element on page', (yargs) => {
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
    const stdout = execSync('curl https://ipecho.net/plain');
    console.log(`Public IP: ${stdout}`);
    check(url, elementQuery);
  })
  .argv