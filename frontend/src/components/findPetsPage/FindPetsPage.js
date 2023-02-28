import React, {useEffect, useState} from "react";
import "./FindPetsPage.css";
import Pet from "../pet/Pet.js";
import {getAllPets} from "../../api/pets";

const FindPetsPage = ({navigate}) => {
    const [pets, setPets] = useState([]);
    const [myPets, setMyPets] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const fetchPets = async () => {
        const currentUserID = window.localStorage.getItem("user_id")
        const pets = await getAllPets(token);
        const splitPets = pets.reduce(([my_pets, other_pets], pet) => {
            return pet.user_id === currentUserID ? [[...my_pets, pet], other_pets] : [my_pets, [...other_pets, pet]];
          }, [[], []]);
        setMyPets(splitPets[0])
        setPets(splitPets[1]);
    };

    useEffect(() => {
        fetchPets();
    }, []);

    const handlePlaydateRequest = async (pet, myPetId) => {
        try {
          const response = await fetch(`/pets/request`, {
            method: "post",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                playdate_request: {
                requester_pet_id: myPetId,
                recipient_pet_id: pet._id,
                recipient_user_id: pet.user_id
              }})
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log('Playdate request sent')
          } else {
            console.log(`Failed to send playdate request`);
          }
        } catch (error) {
          console.error(error);
        }
      };

    if (token) {
        return (
            <div className="find-pets-title-div">
                <h2 className="post-title">Find Pets</h2>
                <div id="find-pets" role="find-pets">

                {pets.map((pet) => (
                    <Pet pet={pet} currentUserPets={myPets} handlePlaydateRequest={handlePlaydateRequest} key={pet._id}/>
                  ))}
                </div>
            </div>
        );
    } else {
        navigate("/login");
    }
};

export default FindPetsPage;
