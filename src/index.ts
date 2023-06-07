import { cli } from 'cleye';

import { downloadFromUrl } from './usecases/downloadFromUrl';

const argv = cli({
  name: 'rget',

  parameters: ['<url>'],

  flags: {},
});

const url = argv._.url;
downloadFromUrl(url);
