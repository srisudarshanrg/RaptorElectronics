package models

// Laptop is the struct that contains and represents information on a laptop object from the database
type Laptop struct {
	ID        int         `json:"id"`
	ModelName string      `json:"name"`
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

// Product is the data struct that holds information about a product
type Product struct {
	ID        int         `json:"id"`
	Name      string      `json:"name"`
	Type      string      `json:"type"`
	Price     int         `json:"price"`
	Company   string      `json:"company"`
	Features  []string    `json:"features"`
	CreatedAt interface{} `json:"created_at"`
	UpdatedAt interface{} `json:"updated_at"`
}

// Monitor is the struct that contains and represents information of a monitor object from the database
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

// Keyboard is the struct that contains and represents information of a keyboard object from the database
type Keyboard struct {
	ID          int         `json:"id"`
	Name        string      `json:"name"`
	Company     string      `json:"company"`
	Type        string      `json:"type"`
	NumberKeys  int         `json:"number_keys"`
	Color       string      `json:"color"`
	RGBLighting bool        `json:"rgb_lighting"`
	Price       int         `json:"price"`
	ImageLink   string      `json:"image_link"`
	CreatedAt   interface{} `json:"created_at,omitempty"`
	UpdatedAt   interface{} `json:"updated_at,omitempty"`
}

// Mouse is the struct that contains and represents a mouse object from the database
type Mouse struct {
	ID             int         `json:"id"`
	Name           string      `json:"name"`
	Company        string      `json:"company"`
	SilentClicking bool        `json:"silent_clicking"`
	Gaming         bool        `json:"gaming"`
	RGBLighting    bool        `json:"rgb_lighting"`
	Color          string      `json:"color"`
	Price          int         `json:"price"`
	ImageLink      string      `json:"image_link"`
	CreatedAt      interface{} `json:"created_at,omitempty"`
	UpdatedAt      interface{} `json:"updated_at,omitempty"`
}

type ItemBrief struct {
	ID        int
	Name      string
	Company   string
	Price     int
	ImageLink string
}
