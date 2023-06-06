/**
 * Overall flow is
 * 1. input url
 * 2. parse url into repo, rest
 * 4. download overall repo
 * 5.
 * 6. copy to cwd
 *
 * 1 ~ 3 and 5 ~ 6 is a internal non-networking JS process (core)
 * 4 is client specific, networking, whether you use curl, github cli, and so on
 */

import { copy } from './usecases/copy';
import { download } from './usecases/download';

async function main() {
  // parseUrl('https://github.com/bisquit/rget');
  // parseUrl('https://github.com/bisquit/rget/');
  // await download('https://github.com/bisquit/rget/tree/sample/1/src');
  const { subpath } = await download(
    'https://github.com/bisquit/rget/blob/sample/1/src/x'
  );
  // parseUrl('https://github.com/bisquit/vscode-fuzzy-go-to-spec/tree/main');

  // await $`git clone --depth=1 -b sample/1 git@github.com:bisquit/rget.git tmp`;

  console.log('subpath', subpath);

  await copy(`tmp/resolved${subpath}`, '.');
}

main();
