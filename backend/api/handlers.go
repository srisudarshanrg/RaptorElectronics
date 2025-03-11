package api

import (
	"log"
	"net/http"

	"github.com/srisudarshanrg/raptor-electronics/models"
)

var loggedIn = false

// Home is the handler for the home responses and requests
func (app Application) Home(w http.ResponseWriter, r *http.Request) {
	var userOutput interface{}

	if loggedIn {
		userInterface := app.Session.Get(r.Context(), "user")
		user := userInterface.(models.User)
		userOutput = user
	} else {
		userOutput = nil
	}

	laptops, monitors, keyboards, mouses, err := app.GetAllItems()
	if err != nil {
		log.Println(err)
	}

	payload := struct {
		Laptops   []models.Laptop   `json:"laptops"`
		Monitors  []models.Monitor  `json:"monitors"`
		Keyboards []models.Keyboard `json:"keyboards"`
		Mouses    []models.Mouse    `json:"mouses"`
		User      interface{}       `json:"user"`
	}{
		Laptops:   laptops,
		Monitors:  monitors,
		Keyboards: keyboards,
		Mouses:    mouses,
		User:      userOutput,
	}

	err = app.writeJSON(w, http.StatusOK, payload)
	if err != nil {
		log.Println(err)
	}
}

func (app Application) SignUp(w http.ResponseWriter, r *http.Request) {
	type payloadStruct struct {
		Username       string `json:"username"`
		Email          string `json:"email"`
		Password       string `json:"password"`
		RepeatPassword string `json:"repeat_password"`
	}

	var userInput payloadStruct

	err := app.readJSON(r, &userInput)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	log.Println(userInput)

	var errors []string
	var checks []bool
	var messages []string

	check1, message1 := app.UsernameNotEmpty(userInput.Username)
	check2, message2 := app.EmailNotEmpty(userInput.Email)
	check3, message3, _ := app.UsernameExists(userInput.Username)
	check4, message4, _ := app.EmailExists(userInput.Email)
	check5, message5 := app.PasswordEqualRepeatPassword(userInput.Password, userInput.RepeatPassword)

	checks = append(checks, check1)
	checks = append(checks, check2)
	checks = append(checks, check3)
	checks = append(checks, check4)
	checks = append(checks, check5)

	messages = append(messages, message1)
	messages = append(messages, message2)
	messages = append(messages, message3)
	messages = append(messages, message4)
	messages = append(messages, message5)

	for index, check := range checks {
		if !check {
			log.Println(messages[index])
			errors = append(errors, messages[index])
		} else {
			continue
		}
	}

	var errorStatus interface{}
	var user interface{}

	if len(errors) > 0 {
		errorStatus = errors
		user = nil
	} else {
		errorStatus = nil
		user, err = app.CreateUser(userInput.Username, userInput.Email, userInput.Password)
		if err != nil {
			log.Println(err)
			return
		}
	}

	var payload = struct {
		Error interface{} `json:"error"`
		User  interface{} `json:"user"`
	}{
		Error: errorStatus,
		User:  user,
	}

	err = app.writeJSON(w, http.StatusOK, payload)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	app.Session.Put(r.Context(), "user", user)
	http.Redirect(w, r, "/", http.StatusSeeOther)
}

func (app Application) Login(w http.ResponseWriter, r *http.Request) {
	type payloadStruct struct {
		Credentials string `json:"credentials"`
		Password    string `json:"password"`
	}

	var userInput payloadStruct

	err := app.readJSON(r, &userInput)
	if err != nil {
		log.Println(err)
		return
	}

	var userOutput interface{}

	user, check, err := app.UserLogin(userInput.Credentials, userInput.Password)
	if err != nil {
		if err.Error() == "Either credentials or password is incorrect" {
			app.errorJSON(w, err, http.StatusUnauthorized)
			return
		} else {
			log.Println(err)
			app.errorJSON(w, err, http.StatusBadRequest)
			return
		}
	}

	if check {
		userOutput = user
	} else {
		userOutput = nil
	}

	var payload = struct {
		User interface{} `json:"user"`
	}{
		User: userOutput,
	}

	app.Session.Put(r.Context(), "user", user)

	err = app.writeJSON(w, http.StatusOK, payload)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	loggedIn = true

	http.Redirect(w, r, "/", http.StatusSeeOther)
}

func (app Application) Logout(w http.ResponseWriter, r *http.Request) {
	app.Session.Remove(r.Context(), "user")
}
