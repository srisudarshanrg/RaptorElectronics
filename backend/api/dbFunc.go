package api

import "github.com/srisudarshanrg/raptor-electronics/models"

func (app Application) GetAllItems() ([]models.Laptop, []models.Monitor, []models.Keyboard, []models.Mouse, error) {
	queryLaptops := `select * from laptops`
	rows, err := app.DB.Query(queryLaptops)
	if err != nil {
		return nil, nil, nil, nil, err
	}

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
