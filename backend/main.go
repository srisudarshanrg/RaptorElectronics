package main

import (
	"fmt"
	"log"
	"net/http"
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
	app.DatabaseDSN = fmt.Sprintf("host=postgresql-raptor.alwaysdata.net port=5432 dbname=raptor_electronics user=raptor password=%s", dbPassword)
	app.Port = 2400

	// create database connection
	db, err := app.ConnectDB()
	if err != nil {
		log.Println("Error connecting to database:", err)
	}
	app.DB = db

	// run app
	log.Println("app running on port", app.Port)
	log.Println("Connected to database")
	err = http.ListenAndServe(fmt.Sprintf(":%d", app.Port), app.Routes())
	if err != nil {
		log.Println(err)
	}
}
