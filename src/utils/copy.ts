import { $ } from 'execa';

export async function copy(src: string, dist: string) {
  await $`cp -R ${src} ${dist}`;
}
