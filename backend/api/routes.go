package api

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

func (app *Application) Routes() http.Handler {
	mux := chi.NewRouter()

	mux.Use(app.enableCORS)
	mux.Use(app.Session.LoadAndSave)

	mux.Get("/", app.Home)

	mux.Post("/sign-up", app.SignUp)
	mux.Post("/login", app.Login)

	return mux
}
