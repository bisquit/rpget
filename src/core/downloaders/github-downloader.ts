import { $ } from 'execa';

import { createTempDir } from '../../utils/create-temp';
import { createFileComponents } from '../../utils/file-components';
import { createPossibleRefs } from '../../utils/possible-refs';
import { Downloader } from './types';

async function getArchive({
  repo,
  ref,
  redirectTo,
}: {
  repo: string;
  ref?: string;
  redirectTo: string;
}) {
  // https://docs.github.com/ja/rest/repos/contents?apiVersion=2022-11-28#download-a-repository-archive-zip
  await $`gh api ${[
    '-H',
    'Accept: application/vnd.github+json',
    '-H',
    'X-GitHub-Api-Version: 2022-11-28',
  ]} /repos/${repo}/zipball/${ref ?? ''}`.pipeStdout?.(redirectTo);
}

export const download: Downloader = async ({ repo, rest, archiveDir }) => {
  if (!rest) {
    const archiveDist = createFileComponents(`${archiveDir}/archive.zip`);
    await getArchive({ repo, redirectTo: archiveDist.filepath });

    return {
      repo,
      archive: archiveDist,
      cleanup: async () => {
        await $`rm -rf ${archiveDir}`;
      },
    };
  }

  const possibleRefs = createPossibleRefs(rest);

  const { ref: resolvedRef, archive } = await Promise.any(
    possibleRefs.map(async (ref, i) => {
      await $`mkdir ${archiveDir}/${i}`;
      const archiveDist = createFileComponents(
        `${archiveDir}/${i}/archive.zip`
      );
      await getArchive({ repo, ref, redirectTo: archiveDist.filepath });
      return { ref, archive: archiveDist };
    })
  );

  const subpath = rest.replace(resolvedRef, '');

  return {
    repo,
    ref: resolvedRef,
    subpath: subpath,
    archive: archive,
    cleanup: async () => {
      await $`rm -rf ${archiveDir}`;
    },
  };
};
