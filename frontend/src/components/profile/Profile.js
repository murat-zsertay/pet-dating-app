import React, {useEffect, useState} from "react";
import './Profile.css'
import Card from './Card.js'
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
            <div data-cy="profile" className="profile">
                <div className="profile-links">
                    <a className="btn btn-primary" href="/findPetsPage" role="button">
                        See all pets
                    </a>
                    <a className="btn btn-primary" href="/edit-profile" role="button">
                        Edit your profile
                    </a>
                </div>
                <h2 className="profile-title"><b>Hooman's Profile</b></h2>
                <div data-cy="user-info" className="user-info">
                    <div className="row">
                        <Card
                            title={
                            <h5 className="usernames">
                                <span className="profile-photo">👾</span>
                                {user.firstName} {user.lastName}
                            </h5>
                            }
                            text={
                            <>
                                <p className="email">
                                <b>📧 Email address:</b> {user.email}
                                </p>
                                <p className="postcode">
                                <b>🏠 Postcode:</b> {user.postcode}
                                </p>
                            </>
                            }
                        />
                    </div>
                </div>
                <h2 className="your-pets-title">Your Pets</h2>
                <div className="pets">
                    {user.pets.length > 0 ? (
                        user.pets.map((pet) => (
                            <div data-cy="pet-info" key={pet._id} className="pet-container">
                                <div className="pet-image-container">
                                    <img
                                        className="petProfileImage"
                                        src={pet.profileImage}
                                        alt="pet-profile"
                                    />
                                </div>
                                <div className="pet-info-container">
                                    <p className='pet-name'><b>{pet.name}</b></p>
                                    <div className="pet-attributes">
                                        <p className='pet-attribute'>Weight: {pet.weight}</p>
                                        <p className='pet-attribute'>Age: {pet.age}</p>
                                        <p className='pet-attribute'>Gender: {pet.gender}</p>
                                    </div>
                                    <p className='pet-description'>
                                        {pet.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-pets"><i> 🐾 No pets! 😭</i></div>
                    )}
                </div>
                {playdates && playdates?.requestsMadeDetails.length > 0 && <h2 className="requested-playdates-title">Playdates you've requested</h2>}
                <div  className="requestedPlaydates">
                    
                    {playdates && playdates?.requestsMadeDetails.filter(elem => elem.playdate.accepted !== 'true').map(playdate => (
                        <div key={`Request made ${playdate._id}`} className='playdate-div'>
                            {console.log(playdate)}
                            <p><b>My pet:</b> {playdate.requesterPet.name}</p>
                            <p><b>Requested pet:</b> {playdate.recipientPet.name}</p>
                            <img
                                className="petProfileImage"
                                src={playdate.recipientPet?.profileImage}
                                alt="pet-profile"
                                />
                            <p><b>Status:</b> {playdate.playdate.accepted.charAt(0).toUpperCase() + playdate.playdate.accepted.slice(1)}</p>
                        </div>
                    ))}
                </div>
                {playdates && playdates?.requestsRecievedDetails.length > 0 && <h2 className="received-playdates-title">Playdates you've received</h2>}
                <div  className="recievedPlaydates">
                    {playdates && playdates?.requestsRecievedDetails.filter(elem => elem.playdate.accepted !== 'true').map(playdate => (
                        <div key={`Request received ${playdate._id}`} className='playdate-div'>
                            <p><b>My pet:</b> {playdate.recipientPet.name}</p>
                            <p><b>Requester pet:</b> {playdate.requesterPet.name}</p>
                            <img
                                className="petProfileImage"
                                src={playdate.requesterPet?.profileImage}
                                alt="pet-profile"
                                />
                            <p><b>Status:</b> {playdate.playdate.accepted.charAt(0).toUpperCase() + playdate.playdate.accepted.slice(1)}</p>
                            <button className="request-buttons" onClick={() => handleRequestUpdate('accept', playdate)} value='accept'>Accept</button>
                            <button className="request-buttons" onClick={() => handleRequestUpdate('reject', playdate)} value='reject'>Reject</button>
                        </div>
                    ))}
                </div>
                {playdates && <h2 className="matched-pets-title">Matched Pets</h2>}
                <div  className="matchedPlaydates">
                    {playdates && playdates?.requestsRecievedDetails.filter(elem => elem.playdate.accepted === 'true').map(playdate => (
                        <div key={`Matched received ${playdate.playdate._id}`} className='playdate-div'>
                            <p>PlayDate</p>
                            <p>My pet: {playdate.recipientPet.name}</p>
                            <p>Matched pet: {playdate.requesterPet.name}</p>
                            <img
                                className="petProfileImage"
                                src={playdate.requesterPet.profileImage}
                                alt="pet-profile"
                                />
                            <p>Status: {playdate.playdate.accepted}</p>
                            <p>Owner name: {playdate.firstName}</p>
                            <p>Owner Email: {playdate.email}</p>
                        </div>
                    ))}
                    {playdates && playdates?.requestsMadeDetails.filter(elem => elem.playdate.accepted === 'true').map(playdate => (
                        <div key={`Matched made ${playdate.playdate._id}`} className='playdate-div'>
                            <p>PlayDate</p>
                            <p>My pet: {playdate.requesterPet.name}</p>
                            <p>Matched pet: {playdate.recipientPet.name}</p>
                            <img
                                className="petProfileImage"
                                src={playdate.recipientPet.profileImage}
                                alt="pet-profile"
                                />
                            <p>Status: {playdate.playdate.accepted}</p>
                            <p>Owner name: {playdate.firstName}</p>
                            <p>Owner Email: {playdate.email}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default Profile;
