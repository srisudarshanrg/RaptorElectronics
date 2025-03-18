package models

type Laptop struct {
	ID        int         `json:"id"`
	ModelName string      `json:"model_name"`
	Processor string      `json:"processor"`
	RAM       int         `json:"ram"`
	Storage   int         `json:"storage"`
	Display   string      `json:"display"`
	Price     int         `json:"price"`
	Company   string      `json:"company"`
	ImageLink string      `json:"image_link"`
	CreatedAt interface{} `json:"created_at,omitempty"`
	UpdatedAt interface{} `json:"updated_at,omitempty"`
}

type Monitor struct {
	ID         int         `json:"id"`
	Name       string      `json:"name"`
	Company    string      `json:"company"`
	Resolution string      `json:"resolution"`
	Size       int         `json:"size"`
	Price      int         `json:"price"`
	ImageLink  string      `json:"image_link"`
	CreatedAt  interface{} `json:"created_at,omitempty"`
	UpdatedAt  interface{} `json:"updated_at,omitempty"`
}

type Keyboard struct {
	ID        int         `json:"id"`
	CreatedAt interface{} `json:"created_at,omitempty"`
	UpdatedAt interface{} `json:"updated_at,omitempty"`
}

type Mouse struct {
	ID        int         `json:"id"`
	CreatedAt interface{} `json:"created_at,omitempty"`
	UpdatedAt interface{} `json:"updated_at,omitempty"`
}
