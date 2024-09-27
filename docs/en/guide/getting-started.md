---
title: Getting started
---
## Dev environment requirement 
```Golang 1.18+```

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
go build -o ./build/awsome && ./build/awsome

# then access: http://localhost:8000
```

> Simple API code
```go
package api

import (
	"api/internal/app/models"
	"github.com/enorith/framework/database"
	"github.com/enorith/http/content"
	"gorm.io/gorm"
)
// ArticleHandler your custom handler
type ArticleHandler struct {
}

type ArticleReq struct {
	content.Request
	Type    int64 `input:"type"`
}


// ListArticles list articles with pagination
func (ArticleHandler) ListArticles(builder *database.Builder[models.Article], req ArticleReq) (*database.PageResult[models.Article], error) {
	return builder.Query(func(d *gorm.DB) *gorm.DB {
		if req.Type > 0 {
			d.Where("type = ?", req.Type)
		}

		d.Preload("Files")
		d.Order("id desc")
		return d
	}).Paginate()
}

// Detail show article detail
func (ArticleHandler) Detail(id content.ParamInt64, db *gorm.DB) (models.Article, error) {
	var article models.Article

    e := tx.First(&article, id)

    return article, e
}

```
> Add route
```go
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