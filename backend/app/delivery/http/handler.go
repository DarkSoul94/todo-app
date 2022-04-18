package http

import (
	"net/http"

	"github.com/DarkSoul94/todo-app/backend/app"
	"github.com/DarkSoul94/todo-app/backend/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
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

type handlerCategory struct {
	ID   uint   `json:"id,omitempty"`
	Name string `json:"name"`
}

func (h *Handler) toModelCategory(cat handlerCategory) models.Category {
	return models.Category{
		Model: gorm.Model{
			ID: cat.ID,
		},
		Name: cat.Name,
	}
}
func (h *Handler) GetCategoryList(c *gin.Context) {

}

func (h *Handler) CreateCategory(c *gin.Context) {
	var (
		cat handlerCategory
		id  uint
		err error
	)

	if err := c.BindJSON(&cat); err != nil {
		c.JSON(http.StatusBadRequest, map[string]interface{}{"status": "error", "error": err.Error()})
		return
	}

	id, err = h.uc.CreateCategory(h.toModelCategory(cat))
	if err != nil {
		c.JSON(http.StatusInternalServerError, map[string]interface{}{"status": "error", "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{"status": "success", "id": id})
}

func (h *Handler) GetTaskList(c *gin.Context) {

}
func (h *Handler) CreateTask(c *gin.Context) {

}
func (h *Handler) UpdateTask(c *gin.Context) {

}
func (h *Handler) DeleteTask(c *gin.Context) {

}
