import { char, charNotIn, createRegExp, maybe, oneOrMore } from 'magic-regexp';

import { GithubRepositoryComponents } from '../types';

export async function parseUrl(
  url: string
): Promise<GithubRepositoryComponents | undefined> {
  console.log('parse', url);

  // https://github.com/bisquit/rget/tree/sample/1
  // repo/tree/<branch | tag | commit>/dir
  // but refs can include '/', so cannot determine dir
  // e.g. https://github.com/bisquit/rget/tree/sample/1
  // is which ?
  // 1. sample, and directory 1 or
  // 2. sample/1 and directory is root
  // fetch branchs and check matching branch

  const repoRegex = createRegExp(
    'https://github.com/',
    oneOrMore(charNotIn('/'))
      .and('/')
      .and(oneOrMore(charNotIn('/')))
      .groupedAs('repo'),
    maybe('/'),
    maybe('tree/'),
    maybe(oneOrMore(char).groupedAs('others'))
  );

  const match = url.match(repoRegex);

  const repo = match?.groups.repo;

  if (!repo) {
    console.log('url is not a github repository.');
    return;
  }

  console.log('repo', repo);

  const others = match.groups.others;

  if (!others) {
    return { repo };
  }

  console.log('others', others);

  // others can be
  // 1. only refs ("main")
  // 2. refs and dir ("main/src", "feat/1/src")
  //
  // Because branch can include "/", we cannot determine
  // "main/src" is
  // a branch "main" and directory "src" or
  // a branch "main/src"
  //
  // To solve this, we fetch branches for the repo

  return undefined;
}
