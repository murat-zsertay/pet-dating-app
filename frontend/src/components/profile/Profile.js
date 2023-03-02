import React, {useEffect, useState} from "react";
import { getUserInfoById } from "../../api/user.js";
import { getPlaydates } from "../../api/playdates.js";
import { updatePlaydates } from '../../api/playdates.js'

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
    // TODO: delete this
    // export const updatePlaydates = async (answer, request) => {
    //     try {
    //         const response = await fetch(`/playdates/requests-response`, {
    //             method: 'PUT',
    //             headers: {
    //                 Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    //             }, 
    //             body: {answer: answer, requestID: request._id}
    //         });
    //         const data = await response.json();
    //         window.localStorage.setItem("token", data.token);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const handleRequestUpdate = async (answer, request) => {
        console.log(request)
        if(answer === 'accept'){
            await updatePlaydates('true', request)
        } else {
            await updatePlaydates('false', request)
        }
        await fetchPlaydates()
    }

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
                    {playdates && playdates?.requestsMadeDetails.filter(elem => elem.playdate.accepted !== 'true').map(playdate => (
                        <div>
                            <p>PlayDate</p>
                            <p>My pet: {playdate.recipientPet.name}</p>
                            <p>Requestor pet: {playdate.requesterPet.name}</p>
                            <p>Status: {playdate.playdate.accepted}</p>
                        </div>
                    ))}
                </div>
                {playdates && playdates?.requestsRecievedDetails.length > 0 && <h2>Playdates you've recieved</h2>}
                <div  className="recievedPlaydates">
                    {playdates && playdates?.requestsRecievedDetails.filter(elem => elem.playdate.accepted !== 'true').map(playdate => (
                        <div>
                            <p>PlayDate</p>
                            <p>My pet: {playdate.recipientPet.name}</p>
                            <p>Requestor pet: {playdate.requesterPet.name}</p>
                            <p>Status: {playdate.playdate.accepted}</p>
                            <button onClick={() => handleRequestUpdate('accept', playdate)} value='accept'>Accept</button>
                            <button onClick={() => handleRequestUpdate('reject', playdate)} value='reject'>Reject</button>
                        </div>
                    ))}
                </div>
                {playdates && <h2>Matched Pets</h2>}
                <div  className="matchedPlaydates">
                    {playdates?.requestsRecievedDetails.filter(elem => elem.playdate.accepted === 'true').map(playdate => (
                        <div>
                            {console.log(playdate)}
                            {console.log(playdates?.requestsRecievedDetails.filter(elem => elem.playdate.accepted === 'true'))}
                            <p>PlayDate</p>
                            <p>My pet: {playdate.recipientPet.name}</p>
                            <p>Matched pet: {playdate.requesterPet.name}</p>
                            <p>Status: {playdate.playdate.accepted}</p>
                            <p>Owner name: {playdate.firstName}</p>
                            <p>Owner Email: {playdate.email}</p>
                        </div>
                    ))}
                    {playdates?.requestsMadeDetails.filter(elem => elem.playdate.accepted === 'true').map(playdate => (
                        <div>
                            {console.log(playdate)}
                            {console.log(playdates?.requestsRecievedDetails.filter(elem => elem.playdate.accepted === 'true'))}
                            <p>PlayDate</p>
                            <p>My pet: {playdate.requesterPet.name}</p>
                            <p>Matched pet: {playdate.recipientPet.name}</p>
                            <p>Status: {playdate.playdate.accepted}</p>
                            <p>Owner name: {playdate.firstName}</p>
                            <p>Owner Email: {playdate.email}</p>
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
