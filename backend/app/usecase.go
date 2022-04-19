package app

import "github.com/DarkSoul94/todo-app/backend/models"

// Usecase ...
type Usecase interface {
	CreateCategory(cat models.Category) (uint, error)

	CreateTask(task models.Task) (uint, error)
}
