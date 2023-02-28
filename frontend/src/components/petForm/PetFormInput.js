import React from 'react';

const PetForm = (props) => {
  const { pet, index, handlePetChange } = props;

  const handleInputChange = (event) => {
    const newPet = { ...pet, [event.target.name]: event.target.value };
    handlePetChange(newPet, index);
  };

  return (
    <div>
      <label htmlFor={`pet-name-${index}`}>Name</label>
      <input
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
        name="weight"
        value={pet.weight}
        onChange={handleInputChange}
      />
      <label htmlFor={`pet-age-${index}`}>Age</label>
      <input
        type="text"
        id={`pet-age-${index}`}
        name="age"
        value={pet.age}
        onChange={handleInputChange}
      />
      <label htmlFor={`pet-description-${index}`}>Description</label>
      <textarea
        type="text"
        id={`pet-description-${index}`}
        name="description"
        value={pet.description}
        onChange={handleInputChange}
      />
      <label htmlFor={`pet-gender-${index}`}>Age</label>
      <input
        type="text"
        id={`pet-gender-${index}`}
        name="gender"
        value={pet.gender}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default PetForm;
