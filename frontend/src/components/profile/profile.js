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
        <div data-cy="user-info" className="user-info">
          <h5 className="usernames">
            {user.firstName} {user.lastName}
          </h5>
          <p className="email">Email address: {user.email}</p>
          <p className="postcode">Postcode: {user.postcode}</p>
        </div>
        <div className="pets">
          {user.pets.length > 0 ? (
            user.pets.map((pet) => (
              <div data-cy="pet-info" className="pet-info">
                <p className="petName">Pet's name: {user.pets[0].name}</p>
                <p className="petWeight">Pet's weight: {user.pets[0].weight}</p>
                <p className="petAge">Pet's age: {user.pets[0].age}</p>
                <p className="petDescription">
                  Pet's description: {user.pets[0].description}
                </p>
                <p className="petGender">Pet's gender: {user.pets[0].gender}</p>
              </div>
            ))
          ) : (
            <div>No pets!</div>
          )}
        </div>
        <>
          <a href="/findPetsPage" className="btn btn-primary ">
            See all pets
          </a>
        </>
        <>
          {" "}
          <a href="/edit-profile" className="btn btn-primary ">
            Edit your profile
          </a>
        </>
      </div>
    );
  }
};

export default Profile;
