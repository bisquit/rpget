import { $ } from 'execa';

import { createTempDir } from '../utils/create-temp';
import { createFileComponents } from '../utils/file-components';
import { parseUrl } from '../utils/parse-url';
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

export const download: Downloader = async (url) => {
  const { repo, rest } = await parseUrl(url);

  const tempDir = await createTempDir();

  if (!rest) {
    const archiveDist = createFileComponents(`${tempDir}/archive.zip`);
    await getArchive({ repo, redirectTo: archiveDist.filepath });

    return {
      repo,
      archive: archiveDist,
      cleanup: async () => {
        await $`rm -rf ${tempDir}`;
      },
    };
  }

  // `rest` can be a
  // 1. only refs ("main")
  // 2. refs and dir ("main/src", "feat/1/src")
  //
  // Because branch can include "/", we cannot determine "main/src" means
  // branch "main" and directory "src" or
  // branch "main/src"
  //
  // Here we try to request with "possible refs" concurrently, which failed if refs are not found.
  // It will incur extra costs, though, in many cases ref may include at most one or two slashes.
  // Also, sequential requests are time-consuming, so we prioritized performance over cost.

  // e.g. "x/y/z" -> ["x", "x/y", "x/y/z"]
  const possibleRefs = rest.split('/').map((_, i, arr) => {
    return arr.slice(0, i + 1).join('/');
  });

  const { ref: resolvedRef, archive } = await Promise.any(
    possibleRefs.map(async (ref, i) => {
      await $`mkdir ${tempDir}/${i}`;
      const archiveDist = createFileComponents(`${tempDir}/${i}/archive.zip`);
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
      await $`rm -rf ${tempDir}`;
    },
  };
};
