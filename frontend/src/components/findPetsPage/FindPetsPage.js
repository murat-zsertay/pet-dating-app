import React, { useEffect, useState } from "react";
import "./FindPetsPage.css";
import { Pet } from "../pet/Pet.js";
import { getUserById } from "../../api/user.js";

const FindPetsPage = ({ navigate }) => {
  const [pets, setPets] = useState([]);
  const [token] = useState(window.localStorage.getItem("token"));

  const fetchPets = async () => {
    const user_id = window.localStorage.getItem("user_id");
    const petsData = await getUserById(user_id);
    setPets(petsData.pets);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  if (token) {
    return (
      <div className="find-pets-title-div">
        <h2 className="post-title">Find Pets</h2>
        <div id="find-pets" role="find-pets">
          {pets.map((pet) => (
            <Pet pet={pet} key={pet._id} />
          ))}
        </div>
      </div>
    );
  } else {
    navigate("/login");
  }
};

export default FindPetsPage;
