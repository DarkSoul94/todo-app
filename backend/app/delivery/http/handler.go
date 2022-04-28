package http

import (
	"fmt"
	"net/http"
	"strconv"

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
	ID   uint   `json:"id"`
	Name string `json:"name,omitempty"`
}

func (h *Handler) toModelCategory(cat handlerCategory) models.Category {
	return models.Category{
		Model: gorm.Model{
			ID: cat.ID,
		},
		Name: cat.Name,
	}
}

func (h *Handler) toHandlerCatgory(cat models.Category) handlerCategory {
	return handlerCategory{
		ID:   cat.ID,
		Name: cat.Name,
	}
}

type handlerTask struct {
	ID       uint            `json:"id"`
	Text     string          `json:"text"`
	Checked  bool            `json:"checked"`
	Category handlerCategory `json:"category"`
}

func (h *Handler) toModelTask(task handlerTask) models.Task {
	return models.Task{
		Model:      gorm.Model{ID: task.ID},
		Text:       task.Text,
		Checked:    task.Checked,
		CategoryID: task.Category.ID,
	}
}

func (h *Handler) toHandlerTask(task models.Task) handlerTask {
	return handlerTask{
		ID:       task.ID,
		Text:     task.Text,
		Checked:  task.Checked,
		Category: h.toHandlerCatgory(task.Category),
	}
}

func (h *Handler) GetCategoryList(c *gin.Context) {
	var (
		catList    []models.Category
		outCatList []handlerCategory = make([]handlerCategory, 0)
		err        error
	)

	catList, err = h.uc.GetCategoryList()
	if err != nil {
		c.JSON(http.StatusInternalServerError, map[string]interface{}{"status": "error", "error": err.Error()})
		return
	}

	for _, cat := range catList {
		outCatList = append(outCatList, h.toHandlerCatgory(cat))
	}

	c.JSON(http.StatusOK, map[string]interface{}{"status": "success", "categoryList": outCatList})
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

func (h *Handler) DeleteCategory(c *gin.Context) {
	var (
		id  uint64
		err error
	)

	id, err = strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil || id == 0 {
		c.JSON(http.StatusBadRequest, map[string]interface{}{"status": "error", "error": "Invalid value in param 'id'"})
		return
	}

	err = h.uc.DeleteCategory(uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, map[string]interface{}{"status": "error", "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{"status": "success"})
}

func (h *Handler) GetTaskList(c *gin.Context) {
	var (
		taskList    []models.Task
		outTaskList []handlerTask = make([]handlerTask, 0)
		err         error
	)

	taskList, err = h.uc.GetTaskList()
	if err != nil {
		c.JSON(http.StatusInternalServerError, map[string]interface{}{"status": "error", "error": err.Error()})
		return
	}

	for _, task := range taskList {
		outTaskList = append(outTaskList, h.toHandlerTask(task))
	}

	c.JSON(http.StatusOK, map[string]interface{}{"status": "success", "taskList": outTaskList})
}

func (h *Handler) CreateTask(c *gin.Context) {
	var (
		newTask handlerTask
		id      uint
		err     error
	)

	if err := c.BindJSON(&newTask); err != nil {
		c.JSON(http.StatusBadRequest, map[string]interface{}{"status": "error", "error": err.Error()})
		return
	}

	id, err = h.uc.CreateTask(h.toModelTask(newTask))
	if err != nil {
		c.JSON(http.StatusInternalServerError, map[string]interface{}{"status": "error", "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{"status": "success", "id": id})
}

func (h *Handler) UpdateTask(c *gin.Context) {
	var (
		task handlerTask
		err  error
	)

	if err := c.BindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, map[string]interface{}{"status": "error", "error": err.Error()})
		return
	}

	fmt.Println(task)
	err = h.uc.UpdateTask(h.toModelTask(task))
	if err != nil {
		c.JSON(http.StatusInternalServerError, map[string]interface{}{"status": "error", "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{"status": "success"})
}

func (h *Handler) DeleteTask(c *gin.Context) {
	var (
		id  uint64
		err error
	)

	id, err = strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil || id == 0 {
		c.JSON(http.StatusBadRequest, map[string]interface{}{"status": "error", "error": "Invalid value in param 'id'"})
		return
	}

	err = h.uc.DeleteTask(uint(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, map[string]interface{}{"status": "error", "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{"status": "success"})
}
