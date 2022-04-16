package http

import (
	"github.com/DarkSoul94/todo-app/backend/app"
	"github.com/gin-gonic/gin"
)

// RegisterHTTPEndpoints ...
func RegisterHTTPEndpoints(router *gin.RouterGroup, uc app.Usecase) {
	h := NewHandler(uc)

	categoryEndpoints := router.Group("/category")
	{
		categoryEndpoints.POST("/", h.CreateCategory)
		categoryEndpoints.GET("/", h.GetCategoryList)
	}

	taskEndpoints := router.Group("/task")
	{
		taskEndpoints.GET("/", h.GetTaskList)
		taskEndpoints.POST("/", h.CreateTask)
		taskEndpoints.PUT("/", h.UpdateTask)
		taskEndpoints.DELETE("/", h.DeleteTask)
	}
}
