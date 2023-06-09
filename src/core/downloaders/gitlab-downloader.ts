import { $ } from 'execa';

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
  // https://docs.gitlab.com/ee/api/rest/index.html#namespaced-path-encoding
  const encodedRepo = repo.replace('/', '%2F');

  // https://docs.gitlab.com/ee/api/repositories.html#get-file-archive
  const result = await $`glab api projects/${encodedRepo}/repository/archive${
    ref ? `?sha=${ref}` : ''
  }`.pipeStdout?.(redirectTo);
  if (result?.stderr) {
    throw new Error(`${result.stderr}`);
  }
}

export const download: Downloader = async ({ repo, rest, archiveDir }) => {
  if (!rest) {
    const archiveDist = createFileComponents(`${archiveDir}/archive.zip`);
    await getArchive({ repo, redirectTo: archiveDist.filepath });

    return {
      repo,
      archive: archiveDist,
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
  };
};
