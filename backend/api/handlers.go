package api

import (
	"log"
	"net/http"

	"github.com/srisudarshanrg/raptor-electronics/models"
)

// Home is the handler for the home responses and requests
func (app Application) Home(w http.ResponseWriter, r *http.Request) {
	laptops, monitors, keyboards, mouses, err := app.GetAllItems()
	if err != nil {
		log.Println(err)
	}

	payload := struct {
		Laptops   []models.Laptop   `json:"laptops"`
		Monitors  []models.Monitor  `json:"monitors"`
		Keyboards []models.Keyboard `json:"keyboards"`
		Mouses    []models.Mouse    `json:"mouses"`
	}{
		Laptops:   laptops,
		Monitors:  monitors,
		Keyboards: keyboards,
		Mouses:    mouses,
	}
 
	err = app.writeJSON(w, http.StatusOK, payload)
	if err != nil {
		log.Println(err)
	}
}

func (app Application) SingleProductType(w http.ResponseWriter, r *http.Request) {
	type Input struct {
		Type string `json:"type"`
	}

	var input Input

	err := app.readJSON(r, &input)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	items, err := app.GetAllItemsWithType(input.Type)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	payload := struct {
		Items interface{} `json:"items"`
		Type  string      `json:"type"`
	}{
		Items: items,
		Type:  input.Type,
	}

	err = app.writeJSON(w, http.StatusOK, payload)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}
}

func (app Application) Profile(w http.ResponseWriter, r *http.Request) {
	type InputPayload struct {
		ID int `json:"id"`
	}

	var inputPayload InputPayload

	err := app.readJSON(r, &inputPayload)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	user, err := app.GetUserByID(inputPayload.ID)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	var payload = struct {
		User models.User `json:"user"`
	}{
		User: user,
	}

	app.writeJSON(w, http.StatusOK, payload)
}

func (app Application) Cart(w http.ResponseWriter, r *http.Request) {
	type payloadStruct struct {
		Cart []models.CartInput `json:"cart"`
	}

	var cartInput payloadStruct

	err := app.readJSON(r, &cartInput)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	items, err := app.GetCartItems(cartInput.Cart)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	payload := struct {
		Items []models.CartOutput `json:"items"`
	}{
		Items: items,
	}

	err = app.writeJSON(w, http.StatusOK, payload)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}
}

func (app Application) Buy(w http.ResponseWriter, r *http.Request) {
	type userUpdate struct {
		ID     int `json:"id"`
		Amount int `json:"amount"`
	}

	type payloadStruct struct {
		Items []models.BoughtItemInput `json:"items"`
		User  userUpdate               `json:"user_update"`
	}

	var itemsInput payloadStruct

	err := app.readJSON(r, &itemsInput)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	confirm, err := app.AddBoughtItem(itemsInput.Items)
	if err != nil || !confirm {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	err = app.UpdateUserAmount(itemsInput.User.ID, itemsInput.User.Amount)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}

	responseStruct := struct {
		Confirmation bool `json:"confirmation"`
	}{
		Confirmation: confirm,
	}
	app.writeJSON(w, http.StatusOK, responseStruct)
}

func (app Application) BoughtItems(w http.ResponseWriter, r *http.Request) {
	type payloadStruct struct {
		UserID int `json:"user_id"`
	}

	var userInput payloadStruct

	err := app.readJSON(r, &userInput)
	if err != nil {
		log.Println(err)
		return
	}

	items, err := app.GetAllBoughtItems(userInput.UserID)
	if err != nil {
		log.Println(err)
		return
	}

	var payload = struct {
		Items  []models.BoughtItem `json:"items"`
		Length int                 `json:"length"`
	}{
		Items:  items,
		Length: len(items),
	}

	err = app.writeJSON(w, http.StatusOK, payload)
	if err != nil {
		log.Println(err)
		return
	}
}

func (app Application) ProductInfo(w http.ResponseWriter, r *http.Request) {
	type payloadInput struct {
		Type string `json:"type"`
		Name string `json:"name"`
	}

	var input payloadInput

	err := app.readJSON(r, &input)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusUnauthorized)
		return
	}

	item, err := app.GetSingleProductInfo(input.Type, input.Name)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusUnauthorized)
		return
	}

	log.Println("item:", item)

	var payload = struct {
		Item interface{} `json:"item"`
	}{
		Item: item,
	}

	err = app.writeJSON(w, http.StatusOK, payload)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusUnauthorized)
		return
	}
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
		app.errorJSON(w, err, http.StatusUnauthorized)
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

	err = app.writeJSON(w, http.StatusOK, payload)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}
}

func (app Application) Amount(w http.ResponseWriter, r *http.Request) {
	type payloadStruct struct {
		UserID int `json:"id"`
	}

	var userInput payloadStruct

	err := app.readJSON(r, &userInput)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusUnauthorized)
		return
	}

	items, err := app.GetAmountBoughtItems(userInput.UserID)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusUnauthorized)
		return
	}

	var payload = struct {
		Items  []models.AmountBoughtItems `json:"items"`
		Length int                        `json:"length"`
	}{
		Items:  items,
		Length: len(items),
	}

	err = app.writeJSON(w, http.StatusOK, payload)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
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
	var success bool

	if len(errors) > 0 {
		errorStatus = errors
		user = nil
		success = false
	} else {
		errorStatus = nil
		success = true
		user, err = app.CreateUser(userInput.Username, userInput.Email, userInput.Password)
		if err != nil {
			log.Println(err)
			return
		}
	}

	var payload = struct {
		Error   interface{} `json:"error"`
		User    interface{} `json:"user"`
		Success bool        `json:"success"`
	}{
		Error:   errorStatus,
		User:    user,
		Success: success,
	}

	err = app.writeJSON(w, http.StatusOK, payload)
	if err != nil {
		log.Println(err)
		app.errorJSON(w, err, http.StatusBadRequest)
		return
	}
}
