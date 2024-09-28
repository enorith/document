---
title: 快速开始
---
[[toc]]
## 开发环境要求
```最新版本Golang```

## 安装Cli工具
```shell
go install github.com/enorith/enocli@latest
```

## 创建并启动你的第一个工程

```shell
enocli init awsome
cd awsome
go mod tidy
# 修改一些配置文件后
go build -o ./build/awsome && ./build/awsome

# 访问地址: http://localhost:8000
```

## 一个两个简单的代码示例
```go
// internal/app/handlers/api/article.go
package api

import (
	"api/internal/app/models"
	"github.com/enorith/framework/database"
	"github.com/enorith/http/content"
	"gorm.io/gorm"
)
// ArticleHandler 自定义的API处理
type ArticleHandler struct {
}

type ArticleReq struct {
	content.Request
	Type    int64 `input:"type"`
}


// ListArticles 文章分页展示
func (ArticleHandler) ListArticles(builder *database.Builder[models.Article], req ArticleReq) (*database.PageResult[models.Article], error) {
	return builder.Query(func(d *gorm.DB) *gorm.DB {
		if req.Type > 0 {
			d.Where("type = ?", req.Type)
		}
		return d.Order("id desc").Preload("Files")
	}).Paginate()
}

// Detail 文章详情展示
func (ArticleHandler) Detail(id content.ParamInt64, db *gorm.DB) (models.Article, error) {
	var article models.Article

    e := tx.First(&article, id)

    return article, e
}


// Detail 文章详情展示（隐式注入）
func (ArticleHandler) Detail2(article models.Article) models.Article {
	

    return article
}

```
> 添加路由
```go
// internal/routes/api.go
package routes

import (
	"api/internal/app/handlers/api"

	"github.com/enorith/http/router"
)

func ApiRoutes(r *router.Wrapper) {
	var articleHandler api.ArticleHandler

    r.Get("articles", articleHandler.ListArticles)
    r.Get("articles/:id", articleHandler.Detail)
}
```