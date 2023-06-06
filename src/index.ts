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
 * Possible fetch methods
 *
 * 1. curl with personal access token - deprecated
 * 2. gh - useful but need setup github cli
 *   https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#download-a-repository-archive-zip
 * 3. git clone - useful
 */

import { $ } from 'execa';

async function main() {
  console.log('main start');
  $`git clone -b x`;
}

main();

/**
 * TODO
 */
function parseUrl() {
  // parse url into repo, ref, directory
}

/**
 * TODO
 *
 *
 */
function getArchive() {
  // download from archive url (zip)
  // https://docs.github.com/ja/repositories/working-with-files/using-files/downloading-source-code-archives#source-code-archive-urls
}
