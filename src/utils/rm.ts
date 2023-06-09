import { $ } from 'execa';

export async function rmrf(dist: string) {
  await $`shx rm -rf ${dist}`;
}
