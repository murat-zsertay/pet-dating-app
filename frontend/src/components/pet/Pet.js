import React, { useState } from 'react';
import './Pet.css';

const Pet = ({pet, currentUserPets, handlePlaydateRequest}) => {
    const [selectedOwnerPet, setSelectedOwnerPet] = useState(currentUserPets ? currentUserPets[0]._id : 'You have no pets')

    const requestDateClicked = () => {
        handlePlaydateRequest(pet, selectedOwnerPet)
    }

    const handleOwnerSelectedPetChange = (event) => {
        setSelectedOwnerPet(event.target.value)
    }

    return (
        <div key={pet._id}>
            <p data-cy='pet-name' className='pet-name'>{pet.name}</p>
            <p data-cy='pet-weight' className='pet-weight'>{pet.weight}</p>
            <p data-cy='pet-age' className='pet-age'>{pet.age}</p>
            <p data-cy='pet-description' className='pet-description'>{pet.description}</p>
            <p data-cy='pet-gender' className='pet-gender'>{pet.gender}</p>
            <div className ="playdateButton">
            <select name="your pets" id="your-pets" onChange={handleOwnerSelectedPetChange}>{currentUserPets.map(pet => (<option value={pet._id}>{pet.name}</option>))}</select>
            <button id="playdate" onClick={requestDateClicked}>Request playdate</button>
            </div>
        </div>
    )
}

export default Pet;
