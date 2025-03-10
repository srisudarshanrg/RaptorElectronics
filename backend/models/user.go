package models

type User struct {
	ID        int         `json:"id"`
	Username  string      `json:"username"`
	Email     string      `json:"email"`
	Password  string      `json:"password"`
	JoinDate  string      `json:"join_date"`
	CreatedAt interface{} `json:"created_at,omitempty"`
	UpdatedAt interface{} `json:"updated_at,omitempty"`
}
