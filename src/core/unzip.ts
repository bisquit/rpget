import { createReadStream, existsSync } from 'node:fs';
import { mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';

import unzipper from 'unzipper';
import yauzl from 'yauzl-promise';

import { copy } from '../utils/copy';
import { rmrf } from '../utils/rm';

/**
 * decompress zip and extract to dist directory
 *
 * zip is possibly decompressed file or directory,
 * so if directory zip, unzip it becomes directory,
 * but if file zip, unzip it becomes file.
 *
 * if unzipping directoroy and direcoty inside dist, it is not ease to use because of nested structure, so this function extracting it and move contensts to dist.
 *
 * @example
 * case1. sample.zip (original is directory containing 'file-1', 'file-2', 'dir-1')
 *
 * await unzip('sample.zip', 'dist');
 * #==>
 * dist/
 *   dir-1/
 *   file-1
 *   file-2
 *
 * case2. sample.zip (original is 'file-1')
 *
 * await unzip('sample.zip', 'dist');
 * #==>
 * dist/
 *   file-1
 */
export async function unzip(zipSrc: string, dist: string) {
  if (!existsSync(dist)) {
    await mkdir(dist, { recursive: true });
  }

  const tmp = join(dist, 'tmp');
  await extract(zipSrc, tmp);

  const dirent = (await readdir(tmp, { withFileTypes: true }))[0];

  if (dirent.isDirectory()) {
    await copy(join(tmp, dirent.name, '*'), dist);
  } else {
    await copy(join(tmp, '*'), dist);
  }

  await rmrf(tmp);
}

async function extract(src: string, dist: string) {
  return new Promise<void>((resolve) => {
    createReadStream(src)
      .pipe(unzipper.Extract({ path: dist }))
      .on('close', () => {
        resolve();
      });
  });
}
