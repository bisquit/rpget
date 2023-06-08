import { Provider } from '../../types';
import { download as githubDownload } from './github-downloader';
import { download as gitlabDownload } from './gitlab-downloader';
import { Downloader } from './types';

export function downloaderFor(provider: Provider): Downloader {
  switch (provider) {
    case 'github':
      return githubDownload;
    case 'gitlab':
      return gitlabDownload;
    default:
      throw new Error('downloader not defined.');
  }
}
