package api

import (
	"log"
	"net/http"

	"github.com/srisudarshanrg/raptor-electronics/models"
)

// Home is the handler for the home responses and requests
func (app Application) Home(w http.ResponseWriter, r *http.Request) {
	laptops, err := app.GetAllItems()
	if err != nil {
		log.Println(err)
	}

	payload := struct {
		Laptops []models.Laptop `json:"laptops"`
	}{
		Laptops: laptops,
	}

	err = app.writeJSON(w, http.StatusOK, payload)
	if err != nil {
		log.Println(err)
	}
}
