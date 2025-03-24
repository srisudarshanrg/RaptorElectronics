package models

type CartInput struct {
	ID    int    `json:"id"`
	Type  string `json:"type"`
	Name  string `json:"name"`
	Price int    `json:"price"`
}

type CartOutput struct {
	ID        int    `json:"id"`
	Type      string `json:"type"`
	Name      string `json:"name"`
	Company   string `json:"company"`
	Price     int    `json:"price"`
	ImageLink string `json:"image_link"`
}
