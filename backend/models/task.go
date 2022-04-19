package models

import (
	"gorm.io/gorm"
)

type Task struct {
	gorm.Model

	Text       string
	Checked    bool
	Category   Category `gorm:"foreignKey:CategoryID"`
	CategoryID uint
}
