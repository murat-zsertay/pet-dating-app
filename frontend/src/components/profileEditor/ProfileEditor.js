import React, { useState, useEffect } from "react";
import {getUserInfoById} from "../../api/user.js";
import PetForm from "../petForm/PetFormInput.js"; 


const ProfileEditor = () => {
  const [updatedUser, setUpdatedUser] = useState();
  const [updatedPet, setUpdatedPet] = useState();
  const [userId, setUserId] = useState(window.localStorage.getItem("user_id"));

  
    useEffect(() => {
      const setCurrentValues = async () => {
        const user = await getUserInfoById(userId);
        console.log(user);
        setUpdatedUser(user);
        setUpdatedPet(user.pets[0]);
      }
    
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      setCurrentValues();
  }, []);
  

  const [token, setToken] = useState(window.localStorage.getItem("token"));
  console.log(updatedUser);

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
    const updatedPets = [...updatedUser.pets];
    updatedPets[index] = updatedPet;
    setUpdatedUser({ ...updatedUser, pets: updatedPets });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(updatedUser);
    updateUser(updatedUser)
  };

  const handleAddPetClick = () => {
    const emptyPet = {name:'', weight: 0, age: 0, description:'', gender: ''}
    setUpdatedUser({...updatedUser, pets: [...updatedUser.pets, emptyPet]})
  }

    return (
      <div className="profile-editor">
        <form className="editor-form" onSubmit={handleSubmit}>
          <label className="form_label" htmlFor="email">Email</label>
          <input className="form_field" id="email" name="email" type="text" value={updatedUser.email} onChange={handleInputChange} />
          <label className="form_label" htmlFor="first-name">First Name</label>
          <input className="form_field" id="first-name" name="firstName" type="text" value={updatedUser.firstName} onChange={handleInputChange} />
          <label className="form_label" htmlFor="last-name">Last Name</label>
          <input className="form_field" id="last-name"  name="lastName" type="text" value={updatedUser.lastName} onChange={handleInputChange} />
          <label className="form_label" htmlFor="postcode">Postcode</label>
          <input className="form_field" id="postcode" name="postcode" type="text" value={updatedUser.postcode} onChange={handleInputChange} />
          <label className="form_label" htmlFor="password">Password</label>
          <input className="form_field" id="password" name="password" type="password" value={updatedUser.password} onChange={handleInputChange} />
          <div className="user-pets">
            {updatedUser.pets.map((pet, index) => (
              <PetForm key={index} pet={pet} index={index} handlePetChange={handlePetChange} />
            ))};
          </div>
          <button className="add-pet" onClick={handleAddPetClick}>Add pet</button>
          <button type="submit">Save</button>
        </form>
        
      </div>
    );
};
    

export default ProfileEditor;