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

	mux.Post("/profile", app.Profile)
	mux.Post("/sign-up", app.SignUp)
	mux.Post("/login", app.Login)
	mux.Post("/cart", app.Cart)
	mux.Post("/buy", app.Buy)
	mux.Post("/bought-items", app.BoughtItems)
	mux.Post("/product-info", app.ProductInfo)
	mux.Post("/single-product-type", app.SingleProductType)
	mux.Post("/spendings", app.Spendings)

	return mux
}
