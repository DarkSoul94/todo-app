package usecase

import (
	"context"

	"github.com/DarkSoul94/todo-app/backend/app"
)

// Usecase ...
type Usecase struct {
	repo app.Repository
}

// NewUsecase ...
func NewUsecase(repo app.Repository) *Usecase {
	return &Usecase{
		repo: repo,
	}
}

// HelloWorld ...
func (u *Usecase) HelloWorld(c context.Context) {
	println("Hello")
}
