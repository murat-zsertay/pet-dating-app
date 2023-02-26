import React, { useState, useEffect } from "react";
import PetForm


const ProfileEditor = (user) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [updatedUser, setUpdatedUser] = useState(user)

  const updateUser = async (user_id) => {
    try {
      const response = await fetch(`/users/${user_id}`,{
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updateUser }),
      });
      const data = await response.json();
      console.log(data)
      setToken(data.token)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    updateUser(user.user_id)
  };

  if (!user) {
    return <div></div>;
  } else {
    return (
      <div className="profile-editor">
        <form className="editor-form" onSubmit={handleSubmit}>
          <input className="form_field" id="email" type="text" value={user.email} onChange={handleEmailChange} />
          <label className="form_label" htmlFor="email">Email</label>
          <input className="form_field" id="first-name" type="text" value={user.firstName} onChange={handleFirstNameChange} />
          <label className="form_label" htmlFor="first-name">First Name</label>
          <input className="form_field" id="last-name" type="text" value={user.lastName} onChange={handleLastNameChange} />
          <label className="form_label" htmlFor="last-name">First Name</label>
          <input className="form_field" id="postcode" type="text" value={user.postcode} onChange={handlePostcodeChange} />
          <label className="form_label" htmlFor="postcode">Postcode</label>
          <input className="form_field" id="postcode" type="password" value={user.password} onChange={handlePasswordChange} />
          <label className="form_label" htmlFor="password">Password</label>
          <div className="user-pets">
            {user.pets.map((pet, index) => (
              <PetForm key={index} pet={pet} index={index} handlePetChange={handlePetChange} />
            ))};
          </div>
            
            <button type="submit">Save</button>
          
        </form>
        <h2 className="profile-title">Profile</h2>
        <div className="user-info">
          <h5 className="usernames">
            {user.firstName} {user.lastName}
          </h5>
          <p className="email">Email address: {user.email}</p>
          <p className="postcode">Postcode: {user.postcode}</p>
        </div>
        <a href="/findPetsPage" className="btn btn-primary ">
          See all pets
        </a>
      </div>
    );
  }
};

export default ProfileEditor;
