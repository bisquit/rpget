import {
  anyOf,
  char,
  charNotIn,
  createRegExp,
  maybe,
  oneOrMore,
} from 'magic-regexp';

import { RepositoryComponentsWithRest } from '../types';

export async function parseUrl(
  url: string
): Promise<RepositoryComponentsWithRest> {
  const repoRegex = createRegExp(
    'https://github.com/',
    oneOrMore(charNotIn('/'))
      .and('/')
      .and(oneOrMore(charNotIn('/')))
      .groupedAs('repo'),
    maybe('/'),
    maybe(anyOf('tree/', 'blob/')),
    maybe(oneOrMore(char).groupedAs('rest')),
    maybe('/').at.lineEnd()
  );

  const match = url.match(repoRegex);
  const repo = match?.groups.repo;
  if (!repo) {
    throw new Error('url is not a github repository.');
  }

  const rest = match.groups.rest;
  return { repo, rest };
}
