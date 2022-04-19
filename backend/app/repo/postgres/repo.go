package postgres

import (
	"github.com/DarkSoul94/todo-app/backend/app"
	"github.com/DarkSoul94/todo-app/backend/models"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type repo struct {
	db *gorm.DB
}

func NewRepo(db *gorm.DB) app.Repository {
	return &repo{db: db}
}

func (r *repo) GetCategoryList() ([]models.Category, error) {
	var catList []models.Category
	tx := r.db.Find(&catList)
	return catList, tx.Error
}

func (r *repo) CreateCategory(cat models.Category) (uint, error) {
	tx := r.db.Create(&cat)
	return cat.ID, tx.Error
}

func (r *repo) DeleteCategory(id uint) error {
	return r.db.Delete(&models.Category{}, id).Error
}

func (r *repo) GetTaskList() ([]models.Task, error) {
	var taskList []models.Task

	tx := r.db.Preload(clause.Associations).Find(&taskList)
	return taskList, tx.Error
}

func (r *repo) CreateTask(task models.Task) (uint, error) {
	tx := r.db.Create(&task)
	return task.ID, tx.Error
}

func (r *repo) UpdateTask(task models.Task) error {
	return r.db.Model(&task).Update("checked", task.Checked).Error
}

func (r *repo) DeleteTask(id uint) error {
	return r.db.Delete(&models.Task{}, id).Error
}
