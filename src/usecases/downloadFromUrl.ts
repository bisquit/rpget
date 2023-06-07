import { copy } from '../utils/copy';
import { download } from '../utils/download';
import { removeTmp } from '../utils/removeTmp';

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
export async function downloadFromUrl(url: string) {
  /**
   * TODO: move to test
   */
  // parseUrl('https://github.com/bisquit/rget');
  // parseUrl('https://github.com/bisquit/rget/');
  // await download('https://github.com/bisquit/rget/tree/sample/1/src');
  // parseUrl('https://github.com/bisquit/vscode-fuzzy-go-to-spec/tree/main');

  // await $`git clone --depth=1 -b sample/1 git@github.com:bisquit/rget.git tmp`;

  const { subpath } = await download(url);

  await copy(`tmp/resolved${subpath}`, '.');

  await removeTmp();
}
