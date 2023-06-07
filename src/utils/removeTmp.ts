import { $ } from 'execa';

export async function removeTmp() {
  await $`rm -rf tmp`;
}
