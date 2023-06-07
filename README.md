# rpget

Download files from a repository url

## Requirements

**Github CLI must be installed**

## Limitations

Currently only Github is supported.

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

Visit repository you want to download, then hit `rpget <url>`.

```sh
# from branch
rpget https://github.com/bisquit/rpget/tree/main/sample

# from tag
rpget https://github.com/bisquit/rpget/tree/v0.0.1/sample

# from commit
rpget https://github.com/bisquit/rpget/tree/9541f14414f10a7d7a2789f529dce6d4bebeaa42/sample
```

You can also download overall repo. (It practically equals to "Download ZIP", unzip it, and move to current directory)

```sh
rpget https://github.com/bisquit/rpget
```

## Comparison

This tool is initialy inspired by,

- https://github.com/tiged/tiged
- https://github.com/unjs/giget

While these are primarily intended for **scaffolding from nothing**, this tool is intended for **copying into existing code**.

Also, because of its use case, aimed to easily download partial directory, not the whole repository.
