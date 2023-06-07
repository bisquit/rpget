import { $ } from 'execa';
import { temporaryDirectory } from 'tempy';

export async function createTempDir(emulate = false): Promise<string> {
  if (emulate) {
    await $`mkdir -p tmp`;
    return './tmp';
  }

  return temporaryDirectory();
}
