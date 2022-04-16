package http

import (
	"github.com/DarkSoul94/todo-app/backend/app"
	"github.com/gin-gonic/gin"
)

// Handler ...
type Handler struct {
	uc app.Usecase
}

// NewHandler ...
func NewHandler(uc app.Usecase) *Handler {
	return &Handler{
		uc: uc,
	}
}

func (h *Handler) GetCategoryList(c *gin.Context) {

}

func (h *Handler) CreateCategory(c *gin.Context) {

}

func (h *Handler) GetTaskList(c *gin.Context) {

}
func (h *Handler) CreateTask(c *gin.Context) {

}
func (h *Handler) UpdateTask(c *gin.Context) {

}
func (h *Handler) DeleteTask(c *gin.Context) {

}
