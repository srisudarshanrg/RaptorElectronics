package models

type Laptop struct {
	ID        int         `json:"id"`
	ModelName string      `json:"model_name"`
	Processor string      `json:"processor"`
	RAM       int         `json:"ram"`
	Storage   int         `json:"storage"`
	Display   string      `json:"display"`
	Company   string      `json:"company"`
	ImageLink string      `json:"image_link"`
	CreatedAt interface{} `json:"created_at,omitempty"`
	UpdatedAt interface{} `json:"updated_at,omitempty"`
}
