package http

import (
	"github.com/DarkSoul94/todo-app/backend/app"
	"github.com/gin-gonic/gin"
)

// RegisterHTTPEndpoints ...
func RegisterHTTPEndpoints(router *gin.Engine, uc app.Usecase) {
	h := NewHandler(uc)

	apiEndpoints := router.Group("/api")
	{
		apiEndpoints.POST("/", h.HelloWorld)
	}
}
