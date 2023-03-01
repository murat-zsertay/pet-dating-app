import React, {useEffect, useState} from "react";
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
                <h2 className="profile-title">Profile</h2>
                <div data-cy="user-info" className="user-info">
                    <h5 className="usernames">
                        {user.firstName} {user.lastName}
                    </h5>
                    <p className="email">Email address: {user.email}</p>
                    <p className="postcode">Postcode: {user.postcode}</p>
                </div>
                <div className="pets">
                    {user.pets.length > 0 ? (
                        user.pets.map((pet) => (
                            <div data-cy="pet-info" className="pet-info">
                                <p className="petName">Pet's name: {pet.name}</p>
                                <img
                                className="petProfileImage"
                                src={pet.profileImage}
                                alt="pet-profile"
                                />
                                <p className="petWeight">Pet's weight: {pet.weight}</p>
                                <p className="petAge">Pet's age: {pet.age}</p>
                                <p className="petDescription">
                                    Pet's description: {pet.description}
                                </p>
                                <p className="petGender">Pet's gender: {pet.gender}</p>
                            </div>
                        ))
                    ) : (
                        <div>No pets!</div>
                    )}
                </div>
                <>
                    <a href="/findPetsPage" className="btn btn-primary ">
                        See all pets
                    </a>
                </>
                <>
                    {" "}
                    <a href="/edit-profile" className="btn btn-primary ">
                        Edit your profile
                    </a>
                </>
            </div>
        );
    }
};

export default Profile;
