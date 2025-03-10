package api

func (app Application) UsernameNotEmpty(username string) (bool, string) {
	if username == "" {
		return false, "Username field cannot be empty"
	}
	return true, ""
}

func (app Application) EmailNotEmpty(email string) (bool, string) {
	if email == "" {
		return false, "Email address field cannot be empty"
	}
	return true, ""
}

func (app Application) PasswordEqualRepeatPassword(password, repeatPassword string) (bool, string) {
	if password != repeatPassword {
		return false, "Password must match repeat password"
	}
	return true, ""
}

func (app Application) UsernameExists(username string) (bool, string, error) {
	query := `select * from users where username=$1`
	results, err := app.DB.Exec(query, username)
	if err != nil {
		return false, "", err
	}
	numberRows, _ := results.RowsAffected()

	if numberRows > 0 {
		return false, "This username already exists", nil
	}

	return true, "", nil
}

func (app Application) EmailExists(email string) (bool, string, error) {
	query := `select * from users where email=$1`
	results, err := app.DB.Exec(query, email)
	if err != nil {
		return false, "", err
	}
	numberRows, _ := results.RowsAffected()

	if numberRows > 0 {
		return false, "This email address already has an account", nil
	}

	return true, "", nil
}
