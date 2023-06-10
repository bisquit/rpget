import shell from 'shelljs';

export async function copy(src: string, dist: string): Promise<void> {
  shell.cp('-R', src, dist);
}
