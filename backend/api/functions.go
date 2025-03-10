package api

import "golang.org/x/crypto/bcrypt"

func (app Application) HashPassword(password string) (string, error) {
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashPassword), err
}

func (app Application) CompareHash(password string, hashPassword string) bool {
	check := bcrypt.CompareHashAndPassword([]byte(hashPassword), []byte(password))
	return check == nil
}
