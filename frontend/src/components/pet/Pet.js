import React, { useState } from 'react';
import './Pet.css';

const Pet = ({pet, currentUserPets, handlePlaydateRequest}) => {
    //TODO: Check this! We will probbaly need to make sure we can't send a request if currentUserPets is undefined or []
    const [selectedOwnerPet, setSelectedOwnerPet] = useState(currentUserPets.length > 0 ? currentUserPets[0]._id : 'You have no pets')

    const requestDateClicked = () => {
        if(!currentUserPets.length > 0){
            alert('You have no pets so can not request.')
            return 
        } else {
            handlePlaydateRequest(pet, selectedOwnerPet)
        }
    }

    const handleOwnerSelectedPetChange = (event) => {
        setSelectedOwnerPet(event.target.value)
    }

    return (
        <div className='pet-container'>
            <div className='pet-image-container'>
            <img
                className="petProfileImage"
                src={pet.profileImage}
                alt="pet-profile"
                />
            </div>
            <div className='pet-info-container'>
                <p data-cy='pet-name' className='pet-name'>Name: {pet.name}</p>
                <p data-cy='pet-weight' className='pet-weight'>Weight: {pet.weight}</p>
                <p data-cy='pet-age' className='pet-age'>Age: {pet.age}</p>
                <p data-cy='pet-description' className='pet-description'>{pet.description}</p>
                <p data-cy='pet-gender' className='pet-gender'>Gender: {pet.gender}</p>
                <div className ="playdateButton">
                <select name="your pets" id="your-pets" onChange={handleOwnerSelectedPetChange}>
                    {currentUserPets.map(pet => (
                    <option value={pet._id} key={pet._id}>
                        {pet.name}
                    </option>)
                    )}
                </select>
                <button id="playdate" onClick={requestDateClicked}>Request playdate</button>
              </div>
              </div>
        </div>
    )
}

export default Pet;
