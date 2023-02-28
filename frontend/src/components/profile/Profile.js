import React, {useEffect, useState} from "react";
import { getUserInfoById } from "../../api/user.js";
import { getPlaydates } from "../../api/playdates.js";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [playdates, setPlaydates] = useState(null);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const fetchUser = async () => {
        const user_id = window.localStorage.getItem("user_id");
        const user = await getUserInfoById(user_id);
        setUser(user);
    };

    const fetchPlaydates = async () => {
        const playdates = await getPlaydates();
        setPlaydates(playdates)
    };

    useEffect(() => {
        fetchUser();
        fetchPlaydates();
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
                <h2>Your Pets</h2>
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
                        <div>No pets!</div>
                    )}
                {playdates && playdates?.requestsMadeDetails.length > 0 && <h2>Playdates you've requested</h2>}
                <div  className="requestedPlaydates">
                    {playdates && playdates?.requestsMadeDetails.map(playdate => (
                        <div>
                            <p>PlayDate</p>
                            <p>{playdate.recipientPet.name}</p>
                            <p>{playdate.requesterPet.name}</p>
                            <p>Status: {playdate.playdate.accepted}</p>
                        </div>
                    ))}
                </div>
                {playdates && playdates?.requestsRecievedDetails.length > 0 && <h2>Playdates you've recieved</h2>}
                <div  className="recievedPlaydates">
                    {playdates && playdates?.requestsRecievedDetails.map(playdate => (
                        <div>
                            <p>PlayDate</p>
                            <p>{playdate.recipientPet.name}</p>
                            <p>{playdate.requesterPet.name}</p>
                            <p>Status: {playdate.playdate.accepted}</p>
                        </div>
                    ))}
                </div>
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
