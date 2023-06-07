import { RepositoryComponentsWithDetail } from '../types';

/**
 * Downloader should return
 * 1. repository information
 * 2. cleanup
 */
export type Downloader = (
  url: string
) => Promise<
  RepositoryComponentsWithDetail & { cleanup: () => Promise<void> | void }
>;
