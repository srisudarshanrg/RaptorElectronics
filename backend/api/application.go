package api

import "database/sql"

type Application struct {
	ProductionFrontendLink  string
	DevelopmentFrontendLink string
	DatabaseDSN             string
	Database                *sql.DB
	Port                    int
}
