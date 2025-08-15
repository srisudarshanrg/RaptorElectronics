package api

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/srisudarshanrg/raptor-electronics/models"
)

func (app Application) GetAllItems() ([]models.Laptop, []models.Monitor, []models.Keyboard, []models.Mouse, error) {
	queryLaptops := `select * from laptops`
	rowsLaptops, err := app.DB.Query(queryLaptops)
	if err != nil {
		return nil, nil, nil, nil, err
	}
	defer rowsLaptops.Close()

	queryMonitors := `select * from monitors`
	rowsMonitors, err := app.DB.Query(queryMonitors)
	if err != nil {
		return nil, nil, nil, nil, err
	}
	defer rowsMonitors.Close()

	queryKeyboards := `select * from keyboards`
	rowsKeyboards, err := app.DB.Query(queryKeyboards)
	if err != nil {
		return nil, nil, nil, nil, err
	}
	defer rowsKeyboards.Close()

	queryMouses := `select * from mouses`
	rowsMouses, err := app.DB.Query(queryMouses)
	if err != nil {
		return nil, nil, nil, nil, err
	}
	defer rowsMouses.Close()

	var laptops []models.Laptop
	var monitors []models.Monitor
	var keyboards []models.Keyboard
	var mouses []models.Mouse

	for rowsLaptops.Next() {
		var laptop models.Laptop
		err = rowsLaptops.Scan(
			&laptop.ID,
			&laptop.ModelName,
			&laptop.Processor,
			&laptop.RAM,
			&laptop.Storage,
			&laptop.Display,
			&laptop.Price,
			&laptop.Company,
			&laptop.ImageLink,
			&laptop.CreatedAt,
			&laptop.UpdatedAt,
		)
		if err != nil {
			return nil, nil, nil, nil, err
		}
		laptops = append(laptops, laptop)
	}

	for rowsMonitors.Next() {
		var monitor models.Monitor
		err = rowsMonitors.Scan(
			&monitor.ID,
			&monitor.Name,
			&monitor.Company,
			&monitor.Resolution,
			&monitor.Size,
			&monitor.Price,
			&monitor.ImageLink,
			&monitor.CreatedAt,
			&monitor.UpdatedAt,
		)
		if err != nil {
			return nil, nil, nil, nil, err
		}
		monitors = append(monitors, monitor)
	}

	for rowsKeyboards.Next() {
		var keyboard models.Keyboard
		err = rowsKeyboards.Scan(
			&keyboard.ID,
			&keyboard.Name,
			&keyboard.Company,
			&keyboard.Type,
			&keyboard.NumberKeys,
			&keyboard.Color,
			&keyboard.RGBLighting,
			&keyboard.Price,
			&keyboard.ImageLink,
			&keyboard.CreatedAt,
			&keyboard.UpdatedAt,
		)
		if err != nil {
			return nil, nil, nil, nil, err
		}
		keyboards = append(keyboards, keyboard)
	}

	for key, value := range keyboards {
		log.Println(key, value)
	}
	for rowsMouses.Next() {
		var mouse models.Mouse
		err = rowsMouses.Scan(
			&mouse.ID,
			&mouse.Name,
			&mouse.Company,
			&mouse.SilentClicking,
			&mouse.Gaming,
			&mouse.RGBLighting,
			&mouse.Color,
			&mouse.Price,
			&mouse.ImageLink,
			&mouse.CreatedAt,
			&mouse.UpdatedAt,
		)
		if err != nil {
			return nil, nil, nil, nil, err
		}
		mouses = append(mouses, mouse)
	}

	return laptops, monitors, keyboards, mouses, nil
}

func (app Application) CreateUser(username, email, password string) (models.User, error) {
	date := time.Now()
	dateString := date.Format("02-01-2006")
	hashPassword, err := app.HashPassword(password)
	if err != nil {
		return models.User{}, err
	}
	queryInsertUser := `insert into users(username, email, password, amount, join_date, created_at, updated_at) values($1, $2, $3, $4, $5, $6, $7)`
	_, err = app.DB.Exec(queryInsertUser, username, email, hashPassword, 999999999, dateString, time.Now(), time.Now())
	if err != nil {
		return models.User{}, err
	}

	queryGetUser := `select * from users where username=$1 and email=$2`
	row := app.DB.QueryRow(queryGetUser, username, email)

	var user models.User

	err = row.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Amount, &user.JoinDate, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return models.User{}, err
	}

	return user, nil
}

func (app Application) UserLogin(credential, password string) (models.User, bool, error) {
	queryCheckUser := `select * from users where username=$1 or email=$1`
	results, _ := app.DB.Exec(queryCheckUser, credential)
	number, _ := results.RowsAffected()
	if number == 0 {
		return models.User{}, false, errors.New("Either credentials or password is incorrect")
	}

	queryGetUser := `select * from users where username=$1 or email=$1`
	row := app.DB.QueryRow(queryGetUser, credential)

	var user models.User

	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.Amount, &user.JoinDate, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return models.User{}, false, err
	}

	check := app.CompareHash(password, user.Password)
	if !check {
		return models.User{}, false, errors.New("Either credentials or password is incorrect")
	}
	return user, true, nil
}

func (app Application) GetUserByID(id int) (models.User, error) {
	query := `select * from users where id=$1`
	row := app.DB.QueryRow(query, id)

	var user models.User
	err := row.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.JoinDate, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return models.User{}, err
	}
	return user, nil
}

func (app Application) GetCartItems(input []models.CartInput) ([]models.CartOutput, error) {
	var cartOutput []models.CartOutput

	for _, i := range input {
		query := fmt.Sprintf("select id, name, company, price, image_link from %s where id=%d", i.Type, i.ID)
		row := app.DB.QueryRow(query)

		var output models.CartOutput
		err := row.Scan(&output.ID, &output.Name, &output.Company, &output.Price, &output.ImageLink)
		if err != nil {
			return nil, err
		}
		output.Type = i.Type
		cartOutput = append(cartOutput, output)
	}

	return cartOutput, nil
}

func (app Application) AddBoughtItem(items []models.BoughtItemInput) (bool, error) {
	query := `insert into user_items(item_id, item_type, item_name, price, user_id) values($1, $2, $3, $4, $5)`

	for _, i := range items {
		_, err := app.DB.Exec(query, i.ItemID, i.ItemType, i.ItemName, i.Price, i.UserID)
		if err != nil {
			return false, err
		}
	}
	return true, nil
}

func (app Application) UpdateUserAmount(userID int, amount int) error {
	query := `update users set amount=$1 where id=$2`
	_, err := app.DB.Exec(query, amount, userID)
	if err != nil {
		return err
	}
	return nil
}

func (app Application) GetAllItemsWithType(itemType string) (interface{}, error) {
	query := fmt.Sprintf("select * from %s", itemType)
	rows, err := app.DB.Query(query)
	if err != nil {
		return nil, err
	}

	switch itemType {
	case "laptops":
		var laptops []models.Laptop

		for rows.Next() {
			var laptop models.Laptop
			err = rows.Scan(
				&laptop.ID,
				&laptop.ModelName,
				&laptop.Processor,
				&laptop.RAM,
				&laptop.Storage,
				&laptop.Display,
				&laptop.Price,
				&laptop.Company,
				&laptop.ImageLink,
				&laptop.CreatedAt,
				&laptop.UpdatedAt,
			)
			if err != nil {
				return nil, err
			}
			laptops = append(laptops, laptop)
		}
		return laptops, nil
	case "monitors":
		var monitors []models.Monitor

		for rows.Next() {
			var monitor models.Monitor
			err = rows.Scan(
				&monitor.ID,
				&monitor.Name,
				&monitor.Company,
				&monitor.Resolution,
				&monitor.Size,
				&monitor.Price,
				&monitor.ImageLink,
				&monitor.CreatedAt,
				&monitor.UpdatedAt,
			)
			if err != nil {
				return nil, err
			}
			monitors = append(monitors, monitor)
		}
		return monitors, nil
	case "keyboards":
		var keyboards []models.Keyboard

		for rows.Next() {
			var keyboard models.Keyboard
			err = rows.Scan(
				&keyboard.ID,
				&keyboard.Name,
				&keyboard.Company,
				&keyboard.Type,
				&keyboard.NumberKeys,
				&keyboard.Color,
				&keyboard.RGBLighting,
				&keyboard.Price,
				&keyboard.ImageLink,
				&keyboard.CreatedAt,
				&keyboard.UpdatedAt,
			)
			if err != nil {
				return nil, err
			}
			keyboards = append(keyboards, keyboard)
		}
		return keyboards, nil
	case "mouses":
		var mouses []models.Mouse

		for rows.Next() {
			var mouse models.Mouse
			err = rows.Scan(
				&mouse.ID,
				&mouse.Name,
				&mouse.Company,
				&mouse.SilentClicking,
				&mouse.Gaming,
				&mouse.RGBLighting,
				&mouse.Color,
				&mouse.Price,
				&mouse.ImageLink,
				&mouse.CreatedAt,
				&mouse.UpdatedAt,
			)
			if err != nil {
				return nil, err
			}
			mouses = append(mouses, mouse)
		}
		return mouses, nil
	}
	return nil, nil
}

func (app Application) GetAllBoughtItems(userID int) ([]models.BoughtItem, error) {
	query := `select * from user_items where user_id=$1`
	rows, err := app.DB.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []models.BoughtItem
	for rows.Next() {
		var item models.BoughtItem
		err = rows.Scan(
			&item.ID,
			&item.ItemID,
			&item.ItemType,
			&item.ItemName,
			&item.Price,
			&item.UserID,
			&item.CreatedAt,
			&item.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		items = append(items, item)
	}

	return items, nil
}

func (app Application) GetSingleProductInfo(typeProduct string, name string) (interface{}, error) {
	query := fmt.Sprintf(`select * from %s where name='%s'`, typeProduct, name)
	log.Println(query)
	row := app.DB.QueryRow(query)

	var err error
	var item interface{}

	switch typeProduct {
	case "laptops":
		var laptop models.Laptop
		err = row.Scan(
			&laptop.ID,
			&laptop.ModelName,
			&laptop.Processor,
			&laptop.RAM,
			&laptop.Storage,
			&laptop.Display,
			&laptop.Price,
			&laptop.Company,
			&laptop.ImageLink,
			&laptop.CreatedAt,
			&laptop.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		item = laptop

	case "monitors":
		var monitor models.Monitor
		err = row.Scan(
			&monitor.ID,
			&monitor.Name,
			&monitor.Company,
			&monitor.Resolution,
			&monitor.Size,
			&monitor.Price,
			&monitor.ImageLink,
			&monitor.CreatedAt,
			&monitor.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		item = monitor

	case "keyboards":
		var keyboard models.Keyboard
		err = row.Scan(
			&keyboard.ID,
			&keyboard.Name,
			&keyboard.Company,
			&keyboard.Type,
			&keyboard.NumberKeys,
			&keyboard.Color,
			&keyboard.RGBLighting,
			&keyboard.Price,
			&keyboard.ImageLink,
			&keyboard.CreatedAt,
			&keyboard.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		item = keyboard

	case "mouses":
		var mouse models.Mouse
		err = row.Scan(
			&mouse.ID,
			&mouse.Name,
			&mouse.Company,
			&mouse.SilentClicking,
			&mouse.Gaming,
			&mouse.RGBLighting,
			&mouse.Color,
			&mouse.Price,
			&mouse.ImageLink,
			&mouse.CreatedAt,
			&mouse.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		item = mouse
	}

	return item, nil
}

func (app Application) GetAmountBoughtItems(userID int) ([]models.AmountBoughtItems, error) {
	query := `select item_type, item_name, price from user_items where user_id=$1`
	rows, err := app.DB.Query(query, userID)
	if err != nil {
		return nil, err
	}

	var items []models.AmountBoughtItems
	for rows.Next() {
		var item models.AmountBoughtItems
		err = rows.Scan(
			&item.ItemType,
			&item.ItemName,
			&item.ItemPrice,
		)
		if err != nil {
			return nil, err
		}
		items = append(items, item)
	}
	return items, nil
}

func (app Application) GetSpendingsInfo(userID int) error {
	return errors.New("hello")
}

// Search searches for item in the database based on a given search query
func (app Application) Search(searchQuery string) ([]models.ItemBrief, error) {
	searchArg := "%" + searchQuery + "%"

	// laptops query
	queryLaptops := `select id, name, company, price, image_link from laptops where lower(name) like $1`
	rowsLaptops, err := app.DB.Query(queryLaptops, searchArg)
	if err != nil {
		return nil, err
	}
	defer rowsLaptops.Close()

	// monitors query
	queryMonitors := `select id, name, company, price, image_link from monitors where lower(name) like $1`
	rowsMonitors, err := app.DB.Query(queryMonitors, searchArg)
	if err != nil {
		return nil, err
	}
	defer rowsMonitors.Close()

	// keyboards query
	queryKeyboards := `select id, name, company, price, image_link from keyboards where lower(name) like $1`
	rowsKeyboards, err := app.DB.Query(queryKeyboards, searchArg)
	if err != nil {
		return nil, err
	}
	defer rowsKeyboards.Close()

	// mouses query
	queryMouses := `select id, name, company, price, image_link from mouses where lower(name) like $1`
	rowsMouses, err := app.DB.Query(queryMouses, searchArg)
	if err != nil {
		return nil, err
	}
	defer rowsMouses.Close()

	totalList := []*sql.Rows{rowsLaptops, rowsMonitors, rowsKeyboards, rowsMouses}
	var items []models.ItemBrief
	const name = "sudarshan"
	for _, itemRow := range totalList {
		var item models.ItemBrief
		itemRow.Scan(
			item.ID,
			item.Name,
			item.Company,
			item.Price,
			item.ImageLink,
		)
	}

	return items, nil
}
