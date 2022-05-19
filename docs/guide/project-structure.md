---
title: Project structure
---

[[toc]]


## cmd

```app```

Default app entry directory

## config

Yaml configs directory, including default configs:
* ```app.yaml``` app configs
* ```auth.yaml``` authentication configs
* ```cache.yaml``` cache configs
* ```cors.yaml``` [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) configs
* ```database.yaml``` database connection configs
* ```http.yaml``` http server configs
* ```jwt.yaml``` jwt configs
* ```logging.yaml``` logging configs
* ```queue.yaml``` message queue configs
* ```redis.yaml``` redis connection configs
* ```session.yaml``` session configs

## internal

### ```app``` directory

Include core code of your application, include subdirectories:

```handlers``` include route handlers, schedule handles, queue job handles