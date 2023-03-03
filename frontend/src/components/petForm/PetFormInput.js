import React from 'react';

const PetForm = (props) => {
  const { pet, index, handlePetChange, handlePetProfileImageEdit, handleImageUpload } = props;

  const handleInputChange = (event) => {
    const newPet = { ...pet, [event.target.name]: event.target.value };
    handlePetChange(newPet, index);
  };

  return (
    <div className="pet-input">
      <div className='pet-input-attributes'>
        <div className='pet-input-attribute'>
          <label htmlFor={`pet-name-${index}`}>Name</label>
          <input
            type="text"
            id={`pet-name-${index}`}
            name="name"
            value={pet.name}
            onChange={handleInputChange}
          />
        </div>
        <div className='pet-input-attribute'>
        <label htmlFor={`pet-weight-${index}`}>Weight</label>
        <input
          type="text"
          id={`pet-weight-${index}`}
          name="weight"
          value={pet.weight}
          onChange={handleInputChange}
        />
        </div>
        <div className='pet-input-attribute'>
        <label htmlFor={`pet-age-${index}`}>Age</label>
        <input
          type="text"
          id={`pet-age-${index}`}
          name="age"
          value={pet.age}
          onChange={handleInputChange}
        />
        </div>
        <div className='pet-input-attribute'>
        <label htmlFor={`pet-description-${index}`}>Description</label>
        <textarea
          type="text"
          id={`pet-description-${index}`}
          name="description"
          value={pet.description}
          onChange={handleInputChange}
        />
        </div>
        <div className='pet-input-attribute'>
        <label htmlFor={`pet-gender-${index}`}>Gender</label>
        <input
          type="text"
          id={`pet-gender-${index}`}
          name="gender"
          value={pet.gender}
          onChange={handleInputChange}
        />
      </div>
      </div>
      <div className="image-container">
        <img
          className="petProfileImage"
          src={pet.profileImage}
          alt="pet-profile"
        />
        <input type="file" maxsize="10485760" accept="image/*" onChange={(event) => handlePetProfileImageEdit(event, index)} />
        <button type='button' onClick={(event) => handleImageUpload(event, index)}>Submit Image</button>
      </div>
    </div>
  );
}

export default PetForm;
