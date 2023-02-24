import React from 'react';
import './Pet.css';

const Pet = ({pet}) => {
    return(
        <div key={pet._id} >
            <p data-cy='pet-name' className='pet-name'>{pet.name}</p>
            <p data-cy='pet-weight' className='pet-weight'>{pet.weight}</p>
            <p data-cy='pet-age' className='pet-age'>{pet.age}</p>
            <p data-cy='pet-description' className='pet-description'>{pet.description}</p>
            <p data-cy='pet-gender' className='pet-gender'>{pet.gender}</p>
        </div>
    )
}

export {Pet};
