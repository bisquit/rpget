/**
 * Components of a Github repository
 */
export type GithubRepositoryComponents = {
  /**
   * repository name with an account or organization
   *
   * @example
   * "bisquit/rget"
   */
  repo: string;

  /**
   * refs (branch, tag, or commit)
   *
   * @example
   * "main"
   * "feat/some"
   * "v1.0.0"
   */
  refs?: string;

  /**
   * directory path
   *
   * @example
   * "src/utils"
   */
  dir?: string;

  /**
   * file name
   *
   * @example
   * "index.ts"
   * "LICENSE"
   */
  file?: string;
};
