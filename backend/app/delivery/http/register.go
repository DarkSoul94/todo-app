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
		categoryEndpoints.GET("/", h.GetCategoryList)
		categoryEndpoints.POST("/", h.CreateCategory)
		categoryEndpoints.DELETE("/:id", h.DeleteCategory)
	}

	taskEndpoints := router.Group("/task")
	{
		taskEndpoints.GET("/", h.GetTaskList)
		taskEndpoints.POST("/", h.CreateTask)
		taskEndpoints.PUT("/", h.UpdateTask)
		taskEndpoints.DELETE("/:id", h.DeleteTask)
	}
}
