import { Link, useOutletContext } from "react-router-dom"
import "../static/styles/LoginPage_SignupPage.css"

function SignupPage() {
    const { errorAlert, setErrorAlert  } = useOutletContext();

    const handleSubmit = (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        console.log(username)
        const email = event.target.email.value;
        console.log(email)
        const password = event.target.password.value;
        const repeat_password = event.target.repeat_password.value;

        var errors = []

        if (password !== repeat_password) {
            errors.push("Password has to be equal to repeated password.")
        }
        if (username.length === 0) {
            errors.push("Username field is required")
        }
        if (email.length === 0) {
            errors.push("Email field is required")
        }
        
        if (errors.length > 0) {
            setErrorAlert(errors);
            console.log(errors)
        } else {

        }
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