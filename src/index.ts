#!/usr/bin/env node

import { cli } from 'cleye';

import { downloadFromUrl } from './download-from-url';

const argv = cli({
  name: 'rget',

  parameters: ['<url>'],

  flags: {},
});

const url = argv._.url;
downloadFromUrl(url);
