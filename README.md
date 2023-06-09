<div align="center">
  <img src="./assets/screenshot.png" width="70%" />
</div>

# rpget

<a href="https://www.npmjs.com/package/rpget"><img src="https://img.shields.io/npm/v/rpget"></a>
[![CI](https://github.com/bisquit/rpget/actions/workflows/ci.yml/badge.svg)](https://github.com/bisquit/rpget/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/bisquit/rpget/branch/main/graph/badge.svg?token=CLG9UC6RG9)](https://codecov.io/gh/bisquit/rpget)

Download a directory or file from a repository URL you are viewing.

## Features

- Download a directory, file or even entire repository.
- With a single command and just a URL. You don't need to remember.
- Support both GitHub and GitLab.

**Currently supported for Mac only.**

## Requirements

The corresponding CLI must be installed, and also authenticated if you want to download from private repositories.

- For GitHub, install [GitHub CLI](https://cli.github.com/)
- For GitLab, install [GLab](https://gitlab.com/gitlab-org/cli)

You only need to install what you use.

## Install

```sh
npm i -g rpget
```

```sh
yarn global add rpget
```

```sh
pnpm add -g rpget
```

## Usage

Hit `rpget <url>`.

```sh
# GitHub
rpget https://github.com/bisquit/rpget/tree/main/sample

# GitLab
rpget https://gitlab.com/bisquit-lab/rpget-test/-/tree/main/sample
```

You can specify file, tag or commits. Just hit the URL you want.

```sh
# file
rpget https://github.com/bisquit/rpget/blob/main/sample/README.md

# tag, commits
rpget https://github.com/bisquit/rpget/tree/v0.0.1/sample
rpget https://github.com/bisquit/rpget/tree/9541f14414f10a7d7a2789f529dce6d4bebeaa42/sample
```

You can also download overall repo. (It practically equals to "Download ZIP", unzip it, and move to current directory)

```sh
rpget https://github.com/bisquit/rpget
```

## How it works

This tool downloads archive(.zip) into a temp directory using API, and
after user confirmed, decompresses it and copies into current directory.

Because branches can include `/`, we cannot distinguish the URL `main/src` between:

- a) `main/src` branch
- b) `main` branch and `src` directory

So this tool attempts to fetch archive with "possible refs" concurrently (in this case, `main` and `main/src`).
It's much faster than checking with `git fetch` or `git clone`.

## Comparison

This tool is initialy inspired by

- https://github.com/Rich-Harris/degit
- https://github.com/unjs/giget

While these are primarily intended for **scaffolding from nothing**, this tool is intended for **copying into existing code**.

Also, because of its use case, aimed to easily download partial directory, not the whole repository.
