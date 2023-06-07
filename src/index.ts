#!/usr/bin/env node

import { cli } from 'cleye';

import * as pkg from '../package.json';
import { downloadFromUrl } from './download-from-url';

const argv = cli({
  name: 'rget',

  parameters: ['<url>'],

  flags: {},

  help: {
    description: pkg.description,
    examples: ['rget https://github.com/bisquit/rget/tree/main/sample'],
  },
});

const url = argv._.url;
downloadFromUrl(url);
