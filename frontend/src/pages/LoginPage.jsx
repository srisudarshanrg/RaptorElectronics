import "../static/styles/LoginPage_SignupPage.css"
import { Link, useOutletContext } from "react-router-dom"

function LoginPage() {
    const { errorAlert } = useOutletContext();
    const { setErrorAlert } = useOutletContext();

    return (
        <>
            <form className="login-form">
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