import React, {useEffect, useState} from "react";
import "./FindPetsPage.css";
import Pet from "../pet/Pet.js";
import {getAllPets} from "../../api/pets";

const FindPetsPage = ({navigate}) => {
    const [pets, setPets] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    const fetchPets = async () => {
        const pets = await getAllPets(token);
        setPets(pets);
    };

    useEffect(() => {
        fetchPets();
    }, []);

    const handlePlaydateRequest = async () => {
      try {
        const response = await fetch(`/pets/request`, {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            petId: pets[0]._id,
            petName: pets[0].name, 
            petWeight: pets[0].weight, 
            petAge: pets[0].age, 
            petGender: pets[0].gender, 
          }),
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
<>
                    <Pet pet={pet} key={pet._id.toString()}/>
                    <div className="playdateButton">
                    <button id="playdate" onClick={()=>handlePlaydateRequest()}>Request playdate</button>
                    </div>
</>
                  ))}
                </div>
            </div>
        );
    } else {
        navigate("/login");
    }
};

export default FindPetsPage;
