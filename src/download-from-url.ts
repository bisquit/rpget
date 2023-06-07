import { cancel, confirm, isCancel, outro, spinner } from '@clack/prompts';
import colors from 'picocolors';

import { download } from './downloaders/github-downloader';
import { copy } from './utils/copy';

export async function downloadFromUrl(url: string) {
  try {
    const s = spinner();
    s.start('Downloading archive');

    const { repo, ref, subpath, downloadPath, cleanup } = await download(url);

    s.stop(
      `Downloaded from
    repo: ${repo}
    ref: ${ref}
    path: ${subpath}`
    );

    const confirmed = await confirm({
      message: `Proceed to copy?`,
    });

    if (!confirmed || isCancel(confirmed)) {
      await cleanup();
      cancel('Copy cancelled.');
      return;
    }

    await copy(`${downloadPath}${subpath}`, '.');
    await cleanup();
    outro(colors.cyan('✔ Successfully copied.'));

    process.exit(0);
  } catch (e: unknown) {
    outro(colors.red(`${e}`));
    process.exit(1);
  }
}
