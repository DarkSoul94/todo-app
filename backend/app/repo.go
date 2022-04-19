package app

import "github.com/DarkSoul94/todo-app/backend/models"

// Repository ...
type Repository interface {
	CreateCategory(cat models.Category) (uint, error)

	GetTaskList() ([]models.Task, error)
	CreateTask(task models.Task) (uint, error)
	UpdateTask(task models.Task) error
	DeleteTask(id uint) error
}
