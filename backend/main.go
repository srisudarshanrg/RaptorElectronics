package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/srisudarshanrg/raptor-electronics/api"
)

var app api.Application

func main() {
	// environment variables
	godotenv.Load(".env")
	dbPassword := os.Getenv("DATABASE_PASSWORD")

	// application setup
	app.DevelopmentFrontendLink = "http://localhost:3000"
	app.ProductionFrontendLink = "https://raptorelectronics.sudarshanraptor.world/"
	app.DatabaseDSN = fmt.Sprintf("host=postgresql-raptor.alwaysdata.net port=5432 dbname=raptor_electronics username=raptor password=%s", dbPassword)
	app.Port = 2400

	
}
