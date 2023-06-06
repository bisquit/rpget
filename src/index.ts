/**
 * Overall flow is
 * 1. input url
 * 2. parse url into repo, refs, directory
 * 3. make archive url
 * 4. download archive url *
 * 5. unzip specified directory
 * 6. copy to cwd
 *
 * 1 ~ 3 and 5 ~ 6 is a internal non-networking JS process (core)
 * 4 is client specific, networking, whether you use curl, github cli, and so on
 */

/**
 * Downloader
 *
 * input - repo, refs, directory
 * output - write files to tmp/out directory
 *
 * Possible downloader
 *
 * 1. curl with personal access token - deprecated
 *
 * 2. gh - useful but need setup github cli
 *   https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#download-a-repository-archive-zip
 *
 * 3. git clone - useful
 *  more efficient with sparse checkout
 */

import { $ } from 'execa';

import { parseUrl } from './utils/parseUrl';

async function main() {
  console.log('main start');

  parseUrl('https://github.com/bisquit/rget');
  parseUrl('https://github.com/bisquit/rget/');
  parseUrl('https://github.com/bisquit/rget/tree/sample/1/src');
  parseUrl('https://github.com/bisquit/vscode-fuzzy-go-to-spec/tree/main');

  // await $`git clone --depth=1 -b sample/1 git@github.com:bisquit/rget.git tmp`;
}

main();

/**
 * TODO
 *
 *
 */
function getArchive() {
  // download from archive url (zip)
  // https://docs.github.com/ja/repositories/working-with-files/using-files/downloading-source-code-archives#source-code-archive-urls
}
