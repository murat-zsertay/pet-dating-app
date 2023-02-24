import React, { useState, useEffect } from "react";

const Profile = ({userId}) => {
  const [user, setUser] = useState(null);

  useEffect(() =>{
    fetch(`/users/user${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.log(error));
  }, [userId]);


  return (
    <div class>
      <div class></div>
      <div className>
        <h2 className='profile-title'>Profile</h2>
        <h5 className='usernames'>{user.firstName}{user.lastName}</h5>
        <p className='email'>Email address: {user.email}</p>
        <p className='postcode'>Postcode: {user.postcode}</p>
        <a href="/findPetsPage" class="btn btn-primary ">
          See all pets
        </a>
      </div>
    </div>
  );

}

export default Profile;

