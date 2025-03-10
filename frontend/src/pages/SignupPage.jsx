import { Link, useOutletContext } from "react-router-dom"
import "../static/styles/LoginPage_SignupPage.css"
import { useEffect } from "react";

function SignupPage() {
    const { errorAlert, setErrorAlert, productionBackendLink, developmentBackendLink, user, setUser  } = useOutletContext();

    const handleSubmit = (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        console.log(username)
        const email = event.target.email.value;
        console.log(email)
        const password = event.target.password.value;
        const repeat_password = event.target.repeat_password.value;

        var errors = []

        let payload = {
            username: username,
            email: email,
            password: password,
            repeat_password: repeat_password,
        }
        const headers = {
            "Content-Type": "application/json",
        }
        const requestOptions = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload),
        }

        fetch(`${developmentBackendLink}sign-up`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error !== null) {
                    data.error.forEach((e) => {
                        errors.push(e)
                    })
                    setErrorAlert(errors);
                    console.log(data.error);
                    console.log(errorAlert)
                } else {
                    console.log("signed up and logged in");
                    setUser(data.user);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    
    return (
        <>
            <form className="signup-form" onSubmit={handleSubmit}>
                <h1>Sign-Up</h1>
                <hr />

                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" name="username" id="username" placeholder="Enter username" />

                <br />

                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="text" className="form-control" name="email" id="email" placeholder="Enter email address" />

                <br />

                <label htmlFor="password" className="form-label">Password</label>
                <input type="text" className="form-control" name="password" id="password" placeholder="Enter password" />

                <br />

                <label htmlFor="repeat_password" className="form-label">Repeat Password</label>
                <input type="text" className="form-control" name="repeat_password" id="repeat_password" placeholder="Repeat password" />

                <hr />

                <button className="btn btn-primary" type="submit">Sign Up</button>

                <p>Or <Link to="/login">login</Link></p>
            </form>
        </>
    )
}

export default SignupPage