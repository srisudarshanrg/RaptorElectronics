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

	return laptops, monitors, keyboards, mouses, nil
}

func (app Application) CreateUser(username, email, password string) (models.User, error) {
	date := time.Now()
	dateString := date.Format("02-01-2006")
	hashPassword, err := app.HashPassword(password)
	if err != nil {
		return models.User{}, err
	}
	queryInsertUser := `insert into users(username, email, password, amount, join_date, created_at, updated_at) values($1, $2, $3, $4, $5)`
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
