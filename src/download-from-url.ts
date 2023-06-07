import { confirm, outro, spinner } from '@clack/prompts';
import colors from 'picocolors';

import { download } from './downloaders/github-downloader';
import { copy } from './utils/copy';

export async function downloadFromUrl(url: string) {
  try {
    const s = spinner();
    s.start('Fetching repository...');

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
      await cleanup();
      outro('Copy cancelled.');
      return;
    }

    await copy(`tmp/resolved${subpath}`, '.');
    await cleanup();
    outro('Successfully copied.');
  } catch (e: unknown) {
    outro(colors.red(`${e}`));
    process.exit(1);
  }
}
