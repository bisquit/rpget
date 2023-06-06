import { $ } from 'execa';

import { GithubRepositoryComponentsWithDetail } from '../types';
import { parseUrl } from '../utils/parseUrl';

export async function download(
  url: string
): Promise<GithubRepositoryComponentsWithDetail> {
  const { repo, rest } = await parseUrl(url);

  console.log(repo, rest);

  if (!rest) {
    await $`git clone --depth=1 git@github.com:${repo}.git tmp/0`;
    return {
      repo,
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
  // Here we try to clone the repository with "possible refs" concurrently.
  // It will incur extra costs, though, in many cases ref may include at most one or two slashes.
  // Also, sequential requests are time-consuming, so we prioritized performance over cost.

  // e.g. "x/y/z" -> ["x", "x/y", "x/y/z"]
  const possibleRefs = rest.split('/').map((_, i, arr) => {
    return arr.slice(0, i + 1).join('/');
  });

  const { ref: resolvedRef, i: resolvedIndex } = await Promise.any(
    possibleRefs.map(async (ref, i) => {
      await $`git clone --depth=1 -b ${ref} git@github.com:${repo}.git tmp/${i}`;
      return { ref, i };
    })
  );

  await $`mv tmp/${resolvedIndex} tmp/resolved`;

  const subpath = rest.replace(resolvedRef, '');

  return {
    repo,
    ref: resolvedRef,
    subpath: subpath,
  };
}
