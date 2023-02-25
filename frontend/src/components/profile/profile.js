import React, { useState, useEffect } from "react";
import { getUserById } from "../../api/user.js";

const Profile = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const user_id = window.localStorage.getItem("user_id");
    const userData = await getUserById(user_id);
    setUser(userData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
