import React, { useState, useEffect } from "react";


const Profile = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const user_id = window.localStorage.getItem("user_id");
  const fetchUser = async (user_id) => {
    try {
      const response = await fetch(`/users/${user_id}`);
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => { 
    fetchUser(user_id); 
  }, []);

  console.log(user)

  if (!user) {
    return <div></div>;
  } else {
    return (
      <div className="profile">
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

export default Profile;
