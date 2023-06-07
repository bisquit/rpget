import { describe, expect, test } from 'vitest';

import { parseUrl } from './parse-url';

describe('error', () => {
  test.each([
    'https://github.com',
    'https://github.com/bisquit',
    'https://github.com/bisquit/',
  ])('should throw invalid url error', async (url) => {
    await expect(() => parseUrl(url)).rejects.toThrowError('url');
  });
});

test.each`
  url                                                                 | repo               | rest
  ${'https://github.com/bisquit/rpget'}                               | ${'bisquit/rpget'} | ${undefined}
  ${'https://github.com/bisquit/rpget/'}                              | ${'bisquit/rpget'} | ${undefined}
  ${'https://github.com/bisquit/rpget/tree/tests/'}                   | ${'bisquit/rpget'} | ${'tests/'}
  ${'https://github.com/bisquit/rpget/tree/tests/basic/src/x'}        | ${'bisquit/rpget'} | ${'tests/basic/src/x'}
  ${'https://github.com/bisquit/rpget/blob/tests/basic/src/x/y'}      | ${'bisquit/rpget'} | ${'tests/basic/src/x/y'}
  ${'https://github.com/bisquit/rpget/blob/tests/basic/src/x/y/z.ts'} | ${'bisquit/rpget'} | ${'tests/basic/src/x/y/z.ts'}
`('returns $repo and $rest', async ({ url, repo, rest }) => {
  expect(await parseUrl(url)).toEqual({ repo, rest });
});
