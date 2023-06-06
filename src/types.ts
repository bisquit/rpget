export type GithubRepositoryComponentsBase = {
  /**
   * repository name with an account or organization
   *
   * @example
   * "bisquit/rget"
   */
  repo: string;
};

export type GithubRepositoryComponentsWithRest =
  GithubRepositoryComponentsBase & {
    /**
     * Rest parts of the url that may be ref and optional directory
     *
     * @example
     * "main"
     * "feat/1"
     * "chore/1/src"
     */
    rest?: string;
  };

/**
 * Components of a Github repository
 */
export type GithubRepositoryComponentsWithDetail =
  GithubRepositoryComponentsBase & {
    /**
     * ref (branch, tag, or commit)
     *
     * @example
     * "main"
     * "feat/some"
     * "v1.0.0"
     */
    ref?: string;

    /**
     * optional sub path
     *
     * @example
     * "/src"
     * "/src/index.ts"
     */
    subpath?: string;

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
