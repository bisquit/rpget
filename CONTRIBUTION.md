## develop

```sh
# Install dependencies
pnpm i

# Run local version (src/index.ts)
pnpm rpget
pnpm rpget https://github.com/bisquit/rpget/tree/tests/basic/src/x
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
pnpm build --watch

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
