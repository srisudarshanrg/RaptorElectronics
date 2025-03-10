package main

import (
	"encoding/gob"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/alexedwards/scs/v2"
	"github.com/joho/godotenv"
	"github.com/srisudarshanrg/raptor-electronics/api"
	"github.com/srisudarshanrg/raptor-electronics/models"
)

var app api.Application
var session *scs.SessionManager

func main() {
	gob.Register(models.User{})

	// environment variables
	godotenv.Load(".env")
	dbPassword := os.Getenv("DATABASE_PASSWORD")

	session = scs.New()
	session.Lifetime = 1 * time.Hour

	// application setup
	app.DevelopmentFrontendLink = "http://localhost:3000"
	app.ProductionFrontendLink = "https://raptorelectronics.sudarshanraptor.world"
	app.DatabaseDSN = fmt.Sprintf("host=postgresql-raptor.alwaysdata.net port=5432 dbname=raptor_electronics user=raptor password=%s", dbPassword)
	app.Session = session
	app.Port = 2400

	// create database connection
	db, err := app.ConnectDB()
	if err != nil {
		log.Println("Error connecting to database:", err)
	}
	app.DB = db
	defer app.DB.Close()

	// run app
	log.Println("app running on port", app.Port)
	log.Println("Connected to database")
	err = http.ListenAndServe(fmt.Sprintf(":%d", app.Port), app.Routes())
	if err != nil {
		log.Println(err)
	}
}
