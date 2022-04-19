package app

import "github.com/DarkSoul94/todo-app/backend/models"

// Repository ...
type Repository interface {
	CreateCategory(cat models.Category) (uint, error)

	CreateTask(task models.Task) (uint, error)
}
