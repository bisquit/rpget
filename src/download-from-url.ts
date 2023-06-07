import { cancel, confirm, isCancel, outro, spinner } from '@clack/prompts';
import decompress from 'decompress';
import colors from 'picocolors';

import { download } from './downloaders/github-downloader';
import { copy } from './utils/copy';

export async function downloadFromUrl(url: string) {
  try {
    const s = spinner();
    s.start('Downloading archive');

    const { repo, ref, subpath, archive, cleanup } = await download(url);

    s.stop(
      [
        'Downloaded archive',
        `      repo - ${repo}`,
        ref && `      ref  - ${ref}`,
        subpath && `      path - ${subpath}`,
      ]
        .filter(Boolean)
        .join('\n')
    );

    const confirmed = await confirm({
      message: `Proceed to copy?`,
    });

    if (!confirmed || isCancel(confirmed)) {
      await cleanup();
      cancel('Copy cancelled.');
      return;
    }

    const reponame = repo.split('/')[1];
    await decompress(archive.filepath, `${archive.filedir}/${reponame}`, {
      strip: 1,
    });

    const copyDist = '.';
    await copy(`${archive.filedir}/${reponame}${subpath ?? ''}`, copyDist);

    await cleanup();

    outro(colors.cyan('✔ Successfully copied.'));
    process.exit(0);
  } catch (e: unknown) {
    outro(colors.red(`${e}`));
    process.exit(1);
  }
}
