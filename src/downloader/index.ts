import { UrlComponents } from '..';

/**
 * Recieve repo, refs, directory,
 * then output files to tmp/out directory
 *
 * In test, check dir and file exists
 *
 * return err if something went wrong with concise message
 *
 * return ok if download completed
 */
type Downloader = (props: UrlComponents) => 'ok' | 'err';

export function ghDownloader() {}

export function gitCloneDownloader() {}
