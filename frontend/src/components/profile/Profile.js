import React, {useEffect, useState} from "react";
import './Profile.css'
import {getUserInfoById} from "../../api/user.js";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const fetchUser = async () => {
        const user_id = window.localStorage.getItem("user_id");
        const user = await getUserInfoById(user_id);
        setUser(user);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (!user) {
        return <div></div>;
    } else {
        return (
            <div className="profile">
                <h2 className="profile-title"><b>Hooman's Profile</b></h2>
                <div data-cy="user-info" className="user-info">
                    <h5 className="usernames">
                        <span className="profile-photo">
                             👾
                        </span>
                        {user.firstName} {user.lastName}
                    </h5>
                    <p className="email"><b>📧 Email address:</b> {user.email}</p>
                    <p className="postcode"><b>🏠 Postcode:</b> {user.postcode}</p>
                </div>
                <div className="pets">
                    {user.pets.length > 0 ? (
                        user.pets.map((pet) => (
                            <div data-cy="pet-info" className="pet-info">
                                <p className="petName">Pet's name: {user.pets[0].name}</p>
                                <p className="petWeight">Pet's weight: {user.pets[0].weight}</p>
                                <p className="petAge">Pet's age: {user.pets[0].age}</p>
                                <p className="petDescription">
                                    Pet's description: {user.pets[0].description}
                                </p>
                                <p className="petGender">Pet's gender: {user.pets[0].gender}</p>
                            </div>
                        ))
                    ) : (
                        <div className="no-pets"><i> 🐾 No pets! 😭</i></div>
                    )}
                </div>
                <>
                <a className="btn btn-primary" href="/findPetsPage" role="button">
                        See all pets
                    </a>
                </>
                <>
                    {" "}
                    <a className="btn btn-primary" href="/edit-profile" role="button">
                        Edit your profile
                    </a>
                </>
            </div>
        );
    }
};

export default Profile;
