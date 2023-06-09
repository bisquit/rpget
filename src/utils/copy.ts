import { $ } from 'execa';

export async function copy(src: string, dist: string) {
  await $`shx cp -R ${src} ${dist}`;
}
