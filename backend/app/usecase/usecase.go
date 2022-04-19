package usecase

import (
	"github.com/DarkSoul94/todo-app/backend/app"
	"github.com/DarkSoul94/todo-app/backend/models"
)

type usecase struct {
	repo app.Repository
}

func NewUsecase(repo app.Repository) app.Usecase {
	return &usecase{
		repo: repo,
	}
}

func (u *usecase) CreateCategory(cat models.Category) (uint, error) {
	return u.repo.CreateCategory(cat)
}

func (u *usecase) CreateTask(task models.Task) (uint, error) {
	return u.repo.CreateTask(task)
}
