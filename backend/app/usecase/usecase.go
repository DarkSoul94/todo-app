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

func (u *usecase) GetCategoryList() ([]models.Category, error) {
	return u.repo.GetCategoryList()
}

func (u *usecase) CreateCategory(cat models.Category) (uint, error) {
	return u.repo.CreateCategory(cat)
}

func (u *usecase) DeleteCategory(id uint) error {
	return u.repo.DeleteCategory(id)
}

func (u *usecase) GetTaskList() ([]models.Task, error) {
	return u.repo.GetTaskList()
}

func (u *usecase) CreateTask(task models.Task) (uint, error) {
	return u.repo.CreateTask(task)
}

func (u *usecase) UpdateTask(task models.Task) error {
	return u.repo.UpdateTask(task)
}

func (u *usecase) DeleteTask(id uint) error {
	return u.repo.DeleteTask(id)
}
