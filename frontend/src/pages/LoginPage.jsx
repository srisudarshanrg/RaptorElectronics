import "../static/styles/LoginPage_SignupPage.css"
import { Link, useOutletContext } from "react-router-dom"

function LoginPage() {
    const { errorAlert, setErrorAlert, user, setUser, developmentBackendLink, productionBackendLink } = useOutletContext();

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(event.target.credentials.value);
        console.log(event.target.password.value)

        var payload = {
            credentials: event.target.credentials.value,
            password: event.target.password.value,
        }
        const headers = {
            "Content-Type": "application/json",
        }
        const requestOptions = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
        }

        var errors = []

        fetch(`${developmentBackendLink}login`, requestOptions)
            .then((response) => {
                console.log(response)
                response.json()
            })
            .then((data) => {
                if (data.error !== null) {
                    data.error.forEach((e) => {
                        errors.push(e);
                    })
                    setErrorAlert(errors);
                } else {
                    console.log("logged in");
                    console.log(data.user);
                    setUser(data.user);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <hr />

                <label htmlFor="credentials" className="form-label">Credentials</label>
                <input type="text" className="form-control" name="credentials" id="credentials" placeholder="Enter username or email address" />

                <br />

                <label htmlFor="password" className="form-label">Password</label>
                <input type="text" className="form-control" name="password" id="password" placeholder="Enter password" />

                <hr />

                <button className="btn btn-primary" type="submit">Login</button>

                <p>Or <Link to="/sign-up">sign up</Link></p>
            </form>
        </>
    )
}

export default LoginPage