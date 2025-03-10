package api

import (
	"database/sql"

	"github.com/alexedwards/scs/v2"
)

type Application struct {
	ProductionFrontendLink  string
	DevelopmentFrontendLink string
	DatabaseDSN             string
	DB                      *sql.DB
	Session                 *scs.SessionManager
	Port                    int
}
