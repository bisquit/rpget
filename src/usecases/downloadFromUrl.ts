import { confirm, outro, spinner } from '@clack/prompts';
import ora from 'ora';

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
  // const spinner = ora('Downloading...').start();
  const s = spinner();
  s.start('Fetching repository...');

  /**
   * TODO: move to test
   */
  // parseUrl('https://github.com/bisquit/rget');
  // parseUrl('https://github.com/bisquit/rget/');
  // await download('https://github.com/bisquit/rget/tree/sample/1/src');
  // parseUrl('https://github.com/bisquit/vscode-fuzzy-go-to-spec/tree/main');

  // await $`git clone --depth=1 -b sample/1 git@github.com:bisquit/rget.git tmp`;

  const { repo, ref, subpath, cleanup } = await download(url);

  s.stop(
    `Fetched from
    repo: ${repo}
    ref: ${ref}
    path: ${subpath}`
  );

  if (
    !(await confirm({
      message: `Is that correct?`,
    }))
  ) {
    outro('Copy cancelled.');
    await cleanup();
    return;
  }

  // console.log('subpath is determined', subpath);

  await copy(`tmp/resolved${subpath}`, '.');

  await cleanup();

  // s.stop('Downloaded!');
  // spinner.succeed('Successfully downloaded!');
  outro('Successfully copied.');
}
