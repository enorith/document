---
title: Getting started
---
## Install cli tools
```shell
go install github.com/enorith/enocli@latest
```

## Create and run your first project

```shell
enocli init awsome
cd awsome
go mod tidy
# after tweak configs
go run ./cmd/app

# then access: http://localhost:8000
```