import React, { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem('token'))

  const user_id = window.localStorage.getItem("user_id")

  useEffect(() =>{
    console.log('Inside use effect')
    const fetchUser = async (user_id) => {
      const response  = await fetch(`/users/${user_id}`)
      const data = await response.json()
      setUser(data)
    }

    fetchUser('63f78c6af22d52bf97f37477')
    // fetch(`/users/63f78c6af22d52bf97f37477`)
    //   .then(response => {
    //     response.json()
    //   })
    //   .then( async (data) => {
    //     setUser(data.user)
    //     console.log(data)
    //   })
    //   .catch(error => console.log(error));
  }, []);


  if(!user){
    return (
      <div></div>
    )
  }
  else{
  return (
      <div className='profile'>
        <h2 className='profile-title'>Profile</h2>
        <div className="user-info">
          <h5 className='usernames'>{user.firstName}{user.lastName}</h5>
          <p className='email'>Email address: {user.email}</p>
          <p className='postcode'>Postcode: {user.postcode}</p>
        </div>
        <a href="/findPetsPage" className="btn btn-primary ">
          See all pets
        </a>
      </div>
  );
  }
}

export default Profile;

