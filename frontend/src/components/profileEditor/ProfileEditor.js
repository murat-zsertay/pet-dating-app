import React, { useState, useEffect } from "react";
import PetForm from "../petForm/PetForm";


const ProfileEditor = (user) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [updatedUser, setUpdatedUser] = useState(user)

  useEffect(() => {
      console.log(updatedUser.pets.length)
  }, [updatedUser.pets])

  const updateUser = async (user) => {
    try {
      const response = await fetch(`/users/${user.user_id}`,{
      method: "post",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ updatedUser }),
      });
      const data = await response.json();
      console.log(data)
      setToken(data.token)
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const newUserInfo = { ...updatedUser, [event.target.name]: event.target.value };
    setUpdatedUser(newUserInfo)
  };

  const handlePetChange = (updatedPet, index) => {
    const updatedPets = [...user.pets];
    updatedPets[index] = updatedPet;
    setUpdatedUser({ ...user, pets: updatedPets });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(updatedUser);
    updateUser(updatedUser)
  };

  const handleAddPetClick = () => {
    const emptyPet = {name:'', weight: 0, age: 0, description:'', gender: ''}
    setUpdatedUser({...updateUser, pets: [...updatedUser.pets, emptyPet]})
    
  }

  if (!user) {
    return <div></div>;
  } else {
    return (
      <div className="profile-editor">
        <form className="editor-form" onSubmit={handleSubmit}>
          <input className="form_field" id="email" name="email" type="text" value={user.email} onChange={handleInputChange} />
          <label className="form_label" htmlFor="email">Email</label>
          <input className="form_field" id="first-name" name="first-name" type="text" value={user.firstName} onChange={handleInputChange} />
          <label className="form_label" htmlFor="first-name">First Name</label>
          <input className="form_field" id="last-name"  name="last-name" type="text" value={user.lastName} onChange={handleInputChange} />
          <label className="form_label" htmlFor="last-name">First Name</label>
          <input className="form_field" id="postcode" name="postcode" type="text" value={user.postcode} onChange={handleInputChange} />
          <label className="form_label" htmlFor="postcode">Postcode</label>
          <input className="form_field" id="password" name="password" type="password" value={user.password} onChange={handleInputChange} />
          <label className="form_label" htmlFor="password">Password</label>
          <div className="user-pets">
            {user.pets.map((pet, index) => (
              <PetForm key={index} pet={pet} index={index} handlePetChange={handlePetChange} />
            ))};
          </div>
            
            <button type="submit">Save</button>
          
        </form>
        
        <button className="add-pet" onClick={handleAddPetClick}>Add pet</button>
      </div>
    );
  }
};

export default ProfileEditor;
