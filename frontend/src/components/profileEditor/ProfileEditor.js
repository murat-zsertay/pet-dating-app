import React, { useState, useEffect } from "react";
import {getUserInfoById} from "../../api/user.js";
import PetForm from "../petForm/PetFormInput.js"; 


const ProfileEditor = ({navigate}) => {
  const [updatedUser, setUpdatedUser] = useState(null);
  const [userId, setUserId] = useState(window.localStorage.getItem("user_id"));
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [petImageFormData, setPetImageFormData] = useState([])


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

  const handlePetProfileImageEdit = (event, index) => {
    event.preventDefault();
    const allowedFormats = ['png', 'jpg', 'jpeg'];
    let file = event.target.files[0];
    console.log(file)
    const fileFormat = file.name.split('.').pop();
    const maxSize = 10485760; // 10 megabyte in bytes
    if (file.size > maxSize) {
      alert('The image is too large! Max size is 10MB');
      file = ''
      return;
    } else if(!allowedFormats.includes(fileFormat)){
      alert('Please upload a png or a jpg file')
      file = ''
      return;
    } else {
      console.log('File is good, adding to form data')
      const formData = new FormData();
      formData.append("image", file);
      setPetImageFormData({...petImageFormData, [index]: formData})
    } 
}

  const handleImageUpload = async (event, index) => {
    event.preventDefault();    
    const correctFormData = petImageFormData[index.toString()]
    const user = await getUserInfoById(userId);
    if(user.pets.length - 1 < index){
      alert('Please save your new pets before uploading their image!')
      return;
    }
    try {
        const response = await fetch(`/pets/profile-image-upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: correctFormData,
        });
  
        const data = await response.json()
        console.log(data)
        const imageURL = data.url.toString();
  
        const uploadRes = await fetch(`/pets/profile-image-edit`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ profileImage: imageURL, index: index }),
        })

        setCurrentValues();
  
    } catch (error) {
        console.error(error);
    }
  } 

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(updatedUser);
    const requiredFields = ['name', 'description', 'gender'];
    const hasEmptyFields = updatedUser.pets.some((pet) => requiredFields.some((field) => !pet[field]));
    if(hasEmptyFields){
      alert('Please fill in all pet fields.');
      return;
    } else {
      updateUser(updatedUser)
    }
    
  };

  const handleAddPetClick = (event) => {
    event.preventDefault();
    const emptyPet = {name:'', weight: 0, age: 0, description:'', gender: ''}
    setUpdatedUser({...updatedUser, pets: [...updatedUser.pets, emptyPet]})
  }
  if(!updatedUser){
    return <p>Loading</p>
  } else {
      return (
        <div className="profile-editor">
          <div className="profile-editor-container">
          <h2>Edit human profile</h2>
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
            <h2>Edit pet profiles</h2>
            <div className="user-pets">
              {updatedUser.pets.map((pet, index) => (
                <PetForm 
                  key={index} 
                  pet={pet} 
                  index={index} 
                  handlePetChange={handlePetChange} 
                  handleImageUpload={handleImageUpload} 
                  handlePetProfileImageEdit={handlePetProfileImageEdit}
                />
              ))}
            </div>
            <div className="add-pets-buttons">
              <button type="file" onClick={handleAddPetClick}>Add pet</button>
              <button type="submit">Save</button>
            </div>
          </form>
          </div>
        </div>
      );
  }
};
    

export default ProfileEditor;