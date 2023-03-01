import React, { useState, useEffect } from "react";
import {getUserInfoById} from "../../api/user.js";
import PetForm from "../petForm/PetFormInput.js"; 


const ProfileEditor = ({navigate}) => {
  const [updatedUser, setUpdatedUser] = useState(null);
  const [userId, setUserId] = useState(window.localStorage.getItem("user_id"));
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [petImageFormData, setPetImageFormData] = useState(null)


  const setCurrentValues = async () => {
    const user = await getUserInfoById(userId);
    await setUpdatedUser(user)
  };

  useEffect(() => {
    setCurrentValues();
  }, []);

  console.log(updatedUser);

  const updateUser = async (user) => {
    try {
      const response = await fetch(`/users/`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ updatedUser }),
      });
      const data = await response.json();
      console.log(data)
      setToken(data.token)
      if (response.ok) {
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    const newUserInfo = { ...updatedUser, [event.target.name]: event.target.value };
    setUpdatedUser(newUserInfo)
  };

  const handlePetChange = (updatedPet, index) => {
    const updatedPets = updatedUser.pets;
    console.log(updatedPets)
    updatedPets[index] = updatedPet;
    setUpdatedUser({ ...updatedUser, pets: updatedPets });
  };

  const handlePetProfileImageEdit = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setPetImageFormData(formData) 
}

  const handleImageUpload = async (event, index) => {
    console.log(index)
    try {
        const response = await fetch(`/pets/profile-image-upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {petImageFormData},
        });
  
        const data = await response.json()
        const imageURL = data.url.toString();
  
        const uploadRes = await fetch(`/pets/profile-image-edit`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profileImage: imageURL, index: index }),
        })

        const uploadResData = await uploadRes.json()
        console.log(uploadResData.pet)

        setCurrentValues();
  
    } catch (error) {
        console.error(error);
    }
  } 

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(updatedUser);
    updateUser(updatedUser)
  };

  const handleAddPetClick = () => {
    const emptyPet = {name:'', weight: 0, age: 0, description:'', gender: ''}
    setUpdatedUser({...updatedUser, pets: [...updatedUser.pets, emptyPet]})
  }
  if(!updatedUser){
    return <p>Loading</p>
  } else {
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
                <PetForm 
                  key={index} 
                  pet={pet} 
                  index={index} 
                  handlePetChange={handlePetChange} 
                  handleImageUpload={(e, index) => handleImageUpload(e, index)} 
                  handlePetProfileImageEdit={handlePetProfileImageEdit}
                />
              ))};
            </div>
            <button className="add-pet" onClick={handleAddPetClick}>Add pet</button>
            <button type="submit">Save</button>
          </form>
        </div>
      );
  }
};
    

export default ProfileEditor;