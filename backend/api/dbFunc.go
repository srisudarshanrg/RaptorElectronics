package api

import (
	"errors"
	"time"

	"github.com/srisudarshanrg/raptor-electronics/models"
)

func (app Application) GetAllItems() ([]models.Laptop, []models.Monitor, []models.Keyboard, []models.Mouse, error) {
	queryLaptops := `select * from laptops`
	rows, err := app.DB.Query(queryLaptops)
	if err != nil {
		return nil, nil, nil, nil, err
	}
	defer rows.Close()

	var laptops []models.Laptop
	var monitors []models.Monitor
	var keyboards []models.Keyboard
	var mouses []models.Mouse

	for rows.Next() {
		var laptop models.Laptop
		err = rows.Scan(
			&laptop.ID,
			&laptop.ModelName,
			&laptop.Processor,
			&laptop.RAM,
			&laptop.Storage,
			&laptop.Display,
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

	return laptops, monitors, keyboards, mouses, nil
}

func (app Application) CreateUser(username, email, password string) (models.User, error) {
	date := time.Now()
	dateString := date.Format("02-01-2006")
	hashPassword, err := app.HashPassword(password)
	if err != nil {
		return models.User{}, err
	}
	queryInsertUser := `insert into users(username, email, password, join_date) values($1, $2, $3, $4)`
	_, err = app.DB.Exec(queryInsertUser, username, email, hashPassword, dateString)
	if err != nil {
		return models.User{}, err
	}

	queryGetUser := `select * from users where username=$1 and email=$2`
	row := app.DB.QueryRow(queryGetUser, username, email)

	var user models.User

	err = row.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.JoinDate, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return models.User{}, err
	}

	return user, nil
}

func (app Application) UserLogin(credential, password string) (models.User, error) {
	queryGetUser := `select password from users where username=$1 or email=$1`
	row, err := app.DB.Query(queryGetUser, credential)

	var user models.User

	err = row.Scan(&user.ID, &user.Username, &user.Email, &user.Password, &user.JoinDate, &user.CreatedAt, &user.UpdatedAt)
	if err != nil {
		return models.User{}, err
	}

	check := app.CompareHash(password, user.Password)
	if !check {
		return models.User{}, errors.New("Either credentials or password is incorrect")
	}
	return user, nil
}
