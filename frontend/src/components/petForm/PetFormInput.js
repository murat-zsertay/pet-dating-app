import React from 'react';
import './PetFormInput.css'

const PetForm = (props) => {
  const { pet, index, handlePetChange, handlePetProfileImageEdit, handleImageUpload } = props;

  const handleInputChange = (event) => {
    const newPet = { ...pet, [event.target.name]: event.target.value };
    handlePetChange(newPet, index);
  };

  return (
    <div className='pet-form'>
      <div className='pet-input-form'>
        <label htmlFor={`pet-name-${index}`}>Name</label>
        <input
          placeholder="Pet's name"
          type="text"
          id={`pet-name-${index}`}
          name="name"
          value={pet.name}
          onChange={handleInputChange}
        />
        <label htmlFor={`pet-weight-${index}`}>Weight</label>
        <input
          type="text"
          id={`pet-weight-${index}`}
          placeholder="Pet's weight"
          name="weight"
          value={pet.weight}
          onChange={handleInputChange}
        />
        <label htmlFor={`pet-age-${index}`}>Age</label>
        <input
          type="text"
          id={`pet-age-${index}`}
          name="age"
          placeholder='How old is your pet?'
          value={pet.age}
          onChange={handleInputChange}
        />
        <label htmlFor={`pet-gender-${index}`}>Gender</label>
        <input
          type="text"
          id={`pet-gender-${index}`}
          placeholder="Pet's gender"
          name="gender"
          value={pet.gender}
          onChange={handleInputChange}
        />
        <div className='textarea'>
        <label htmlFor={`pet-description-${index}`}>Description</label>
        <textarea
          type="text"
          id={`pet-description-${index}`}
          name="description"
          value={pet.description}
          onChange={handleInputChange}
        />
        </div>
      </div>
      <div className="pet-form-image-container">
        <img
          className="petProfileImage"
          src={pet.profileImage}
          alt="pet-profile"
        />
        <input type="file" maxsize="10485760" accept="image/*" onChange={(event) => handlePetProfileImageEdit(event, index)} />
        <div className='pet-image-button'><button type='button' onClick={(event) => handleImageUpload(event, index)}>Submit Image</button></div>
      </div>
    </div>
  );
}

export default PetForm;
