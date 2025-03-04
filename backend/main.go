package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/srisudarshanrg/raptor-electronics/api"
)

var app api.Application

func main() {
	// environment variables
	godotenv.Load(".env")
	log.Println(os.Getenv("DATABASE_PASSWORD"))

	app.DevelopmentFrontendLink = "http://localhost:3000"
	app.ProductionFrontendLink = "https://raptorelectronics.sudarshanraptor.world/"
	app.DatabaseDSN = ""
}
