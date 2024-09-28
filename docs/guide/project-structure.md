---
title: 项目结构
---

[[toc]]

## cmd

```app```

程序默认入口

## config

yaml配置文件，包含一些默认配置:
* ```app.yaml``` 应用配置
* ```auth.yaml``` 登陆授权
* ```cache.yaml``` 缓存配置
* ```cors.yaml``` [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) 跨域配置
* ```database.yaml``` 数据库连接配置
* ```http.yaml``` http服务配置
* ```jwt.yaml``` jwt验证配置
* ```logging.yaml``` 日志配置
* ```queue.yaml``` 消息队列配置
* ```redis.yaml``` redis连接配置
* ```session.yaml``` session配置（HTTP）

## internal

### ```app``` 目录

主要存放业务代码，包括以下目录:

 * ```handlers```
    - ```api``` API处理代码实现（无session）
    - ```job``` 队列任务定义
    - ```schedule``` 定时任务处理
    - ```web``` web处理代码实现（带session）

 * ```models``` 数据库模型定义（使用gorm）

 * ```requests``` 请求对象定义

 * ```routes``` 路由定义

 * ```services``` 业务服务定义

 * ```bootstrap.go``` 启动引导文件，加载一些必要的服务

### ```pkg``` 目录

## resources

## storage