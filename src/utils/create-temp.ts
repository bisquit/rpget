import { temporaryDirectory } from 'tempy';

export async function createTempDir(): Promise<string> {
  return temporaryDirectory();
}
