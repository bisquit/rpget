# E2E

Curretly, E2E is hand-testing for cross patterns.

- Platform (Mac, Win)
- Provider (GitHub, GitLab)
- Download (directory, entire repository, cancel, error)

## Setup

```sh
# remove installed version
pnpm rm -g rpget

# linking this pkg to global
pnpm link -g

# Code validation
pnpm validate

# build
pnpm build --watch

# Move to clean directory (here use Desktop)
cd ~/Desktop
```

Also, authenticate GitHub CLI and GLab CLI.

## Run

### on Mac

#### for GitHub

```sh
# GitHub x directory
rpget https://github.com/bisquit/rpget/tree/main/sample
#==> sample

# GitHub x root
rpget https://github.com/bisquit/rpget
#==> rpget

# GitHub x cancel
rpget https://github.com/bisquit/rpget # Then cancel confirm with `No`
#==> 'Cancelled.'
rpget https://github.com/bisquit/rpget # Then hit Ctrl + C
#==> 'Cancelled.'

# GitHub x error
rpget https://github.com/bisquit/rpget/tree/m
#==> 'ERROR'
```

#### for GitLab

```sh
# GitLab x directoy
rpget https://gitlab.com/bisquit-lab/rpget-test/-/tree/main/sample
#==> sample

# GitLab x root
rpget https://gitlab.com/bisquit-lab/rpget-test
#==> rpget-test

# GitLab x cancel
rpget https://gitlab.com/bisquit-lab/rpget-test # Then cancel confirm with `No`
#==> 'Cancelled.'
rpget https://gitlab.com/bisquit-lab/rpget-test # Then hit Ctrl + C
#==> 'Cancelled.'

# GitLab x error
rpget https://gitlab.com/bisquit-lab/rpget-test/-/tree/m
#==> 'ERROR'
```

### on Win

Same as Mac
