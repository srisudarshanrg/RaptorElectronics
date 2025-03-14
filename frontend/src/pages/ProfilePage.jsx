import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import "../static/styles/ProfilePage.css"

function ProfilePage() {
    const { developmentBackendLink, productionBackendLink, navigate, loggedIn, errorAlert, setErrorAlert } = useOutletContext();

    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        let user = sessionStorage.getItem("user")

        if (user === null) {
            navigate("/")
            setErrorAlert(["Login first to view your profile"])
            return
        } else {
            setUserProfile(JSON.parse(user))
        }
    }, [loggedIn])

    return (
        <div className="profile-page">
            <h1 style={{marginTop: "2%"}}>Your Profile</h1>
            <hr />
            {
                <>
                    <div className="profile-row">
                        <div className="profile-col">
                            <h5>USERNAME</h5>
                            <h1>{userProfile.username}</h1>
                        </div>

                        <div className="profile-col">
                            <h5>EMAIL ADDRESS</h5>
                            <h1>{userProfile.email}</h1>
                        </div>

                        <div className="profile-col">
                            <h5>JOIN DATE</h5>
                            <h1>{userProfile.join_date}</h1>                
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default ProfilePage