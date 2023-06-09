import cpy from 'cpy';
export async function copy(src: string, dist: string): Promise<void> {
  await cpy(src, dist);
}
