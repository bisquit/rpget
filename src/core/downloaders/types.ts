import { RepositoryComponentsWithDetail } from '../../types';
import { FileComponents } from '../../utils/file-components';

/**
 * Downloader should return
 * 1. repository information
 * 2. archive path and cleanup
 */
export type Downloader = (
  repo: string,
  rest?: string
) => Promise<
  RepositoryComponentsWithDetail & {
    archive: FileComponents;
    cleanup: () => Promise<void> | void;
  }
>;
