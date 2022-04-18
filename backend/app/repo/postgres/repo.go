package postgres

import (
	"github.com/DarkSoul94/todo-app/backend/app"
	"github.com/DarkSoul94/todo-app/backend/models"
	"gorm.io/gorm"
)

type repo struct {
	db *gorm.DB
}

func NewRepo(db *gorm.DB) app.Repository {
	return &repo{db: db}
}

func (r *repo) CreateCategory(cat models.Category) (uint, error) {
	tx := r.db.Create(&cat)
	return cat.ID, tx.Error
}
