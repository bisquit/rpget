## develop

```sh
# Install dependencies
pnpm i

# Run src (index.ts) directly
pnpm dev
pnpm dev https://github.com/bisquit/rpget/tree/tests/basic/src/x
```

### Testing

```sh
# Unit test
pnpm test
```

### Test local build version behavior

```sh
# linking this pkg to global
pnpm link

# watch build
## normal build (which is the same as production shipped)
pnpm build --watch
## debug mode (log extra informations)
pnpm build:debug --watch

# Then, cd any directory
rpget
```

If you installed published version, be sure removing it to avoid confliction.

```sh
pnpm ls -g
pnpm rm -g rpget
```

## publish

```sh
pnpm dlx bumpp
#==> tag push triggers publish github actions
```
