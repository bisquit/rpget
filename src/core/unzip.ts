import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { join, sep } from 'node:path';

import AdmZip from 'adm-zip';

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
  const zip = new AdmZip(zipSrc);

  if (!existsSync(dist)) {
    await mkdir(dist, { recursive: true });
  }

  for (const entry of zip.getEntries()) {
    const entryName = entry.entryName;
    const shiftedEntryName = shiftPath(entryName);

    if (entry.isDirectory) {
      if (!existsSync(join(dist, shiftedEntryName))) {
        await mkdir(join(dist, shiftedEntryName));
      }
      continue;
    }

    const content = entry.getData();
    if (!content) {
      continue;
    }

    await writeFile(join(dist, shiftedEntryName), content, {
      encoding: 'utf-8',
    });
  }
}

export function shiftPath(path: string, level = 1) {
  if (!path.includes(sep)) {
    return path;
  }

  return path.split(sep).slice(level).join(sep);
}
