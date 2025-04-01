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

type BoughtItemInput struct {
	ItemID   int    `json:"item_id"`
	ItemType string `json:"item_type"`
	ItemName string `json:"item_name"`
	Price    int    `json:"price"`
	UserID   int    `json:"user_id"`
}

type BoughtItem struct {
	ID        int         `json:"id"`
	ItemID    int         `json:"item_id"`
	ItemType  string      `json:"item_type"`
	ItemName  string      `json:"item_name"`
	Price     int         `json:"price"`
	UserID    int         `json:"user_id"`
	CreatedAt interface{} `json:"created_at,omitempty"`
	UpdatedAt interface{} `json:"updated_at,omitempty"`
}
