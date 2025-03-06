package api

import "database/sql"

type Application struct {
	ProductionFrontendLink  string
	DevelopmentFrontendLink string
	DatabaseDSN             string
	DB                      *sql.DB
	Port                    int
}
