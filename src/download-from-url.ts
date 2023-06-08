import { cancel, confirm, isCancel, log, outro, spinner } from '@clack/prompts';
import decompress from 'decompress';
import colors from 'picocolors';

import { downloaderFor } from './core/downloaders';
import { parseUrl } from './core/parse-url';
import { copy } from './utils/copy';
import { createTempDir } from './utils/create-temp';
import { debugLog } from './utils/debug';

export async function downloadFromUrl(url: string) {
  try {
    const { provider, repo, rest } = await parseUrl(url);

    log.info(`Detected ${provider} url`);

    const archiveDir = await createTempDir();
    debugLog({ archiveDir });

    const s = spinner();
    s.start(`Downloading archive`);

    const { ref, subpath, archive, cleanup } = await downloaderFor(provider)({
      repo,
      rest,
      archiveDir,
    });

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
