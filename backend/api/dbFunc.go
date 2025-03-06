package api

import "github.com/srisudarshanrg/raptor-electronics/models"

func (app Application) GetAllItems() ([]models.Laptop, error) {
	queryLaptops := `select * from laptops`
	rows, err := app.DB.Query(queryLaptops)
	if err != nil {
		return nil, err
	}

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
}
