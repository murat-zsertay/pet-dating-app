import React, {useEffect, useState} from "react";
import {getUserInfoById} from "../../api/user";

const EditProfile = ({navigate}) => {
    const [petName, setPetName] = useState("");
    const [petWeight, setPetWeight] = useState("");
    const [petAge, setPetAge] = useState("");
    const [petGender, setPetGender] = useState("");
    const [petDescription, setPetDescription] = useState("");
    const [error, setError] = useState(null);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const [userId, setUserId] = useState(window.localStorage.getItem("user_id"));
    const [petProfileImage, setPetProfileImage] = useState(null)

    const setCurrentValues = async () => {
        const user = await getUserInfoById(userId);
        if (user.pets.length === 0) {
            return;
        }
        const pet = user.pets[0];
        setPetName(pet.name);
        setPetWeight(pet.weight);
        setPetAge(pet.age);
        setPetDescription(pet.description);
        setPetGender(pet.gender);
        setPetProfileImage(pet.profileImage)
    };

    useEffect(() => {
        setCurrentValues();
    }, []);

    const handlePetProfileImageEdit = () => {

    }

    const handleImageSubmit = async (event) => {
        const file = event.target.files[0];
        try {
            const formData = new FormData();
            formData.append("image", file);
      
            const response = await fetch(`/pet/profile-image`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            });
      
            const data = await response.json()
            setPetProfileImage(data.profileImage);
      
            // await fetch(`/users/profile-picture/${user.userId}`, {
            //   method: "PUT",
            //   headers: {
            //     Authorization: `Bearer ${token}`,
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({ profilePicture: imageURL }),
            // });
      
          } catch (error) {
            console.error(error);
          }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("/users", {
            method: "PUT",
            body: JSON.stringify({
                pet: {
                    name: petName,
                    weight: petWeight,
                    gender: petGender,
                    description: petDescription,
                    age: petAge,
                },
            }),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.message);
        }

        if (response.ok) {
            navigate("/profile");
        }
    };

    const handlePetNameChange = (event) => {
        setPetName(event.target.value);
    };

    const handlePetWeightChange = (event) => {
        setPetWeight(event.target.value);
    };

    const handlePetAgeChange = (event) => {
        setPetAge(event.target.value);
    };

    const handlePetDescriptionChange = (event) => {
        setPetDescription(event.target.value);
    };

    const handlePetGenderChange = (event) => {
        setPetGender(event.target.value);
    };

    return (
        <main>
            <h2 id="sign-up-title">Edit Profile</h2>

            <div className="container">
                <img
                className="petProfileImage"
                src={petProfileImage}
                alt="profile"
                />
                <div>
                    <input type="file" accept="image/*" onChange={handlePetProfileImageEdit} />
                    <button onClick={handleImageSubmit}>Submit Image</button>
                </div>
                <form className="editProfile" onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input
                            className="form_field"
                            id="petName"
                            type="text"
                            value={petName}
                            onChange={handlePetNameChange}
                        />
                        <label id="form_label" htmlFor="petName">
                            Pet's name:
                        </label>
                        <i></i>
                    </div>

                    <div className="input-box">
                        <input
                            className="form_field"
                            id="petWeight"
                            type="number"
                            value={petWeight}
                            onChange={handlePetWeightChange}
                        />
                        <label id="form_label" htmlFor="petWeight">
                            Weight:
                        </label>
                        <i></i>
                    </div>

                    <div className="input-box">
                        <input
                            className="form_field"
                            id="petAge"
                            type="number"
                            value={petAge}
                            onChange={handlePetAgeChange}
                        />
                        <label id="form_label" htmlFor="petAge">
                            Pet's age:
                        </label>
                        <i></i>
                    </div>

                    <div className="input-box">
                        <input
                            className="form_field"
                            id="petDescription"
                            type="text"
                            value={petDescription}
                            onChange={handlePetDescriptionChange}
                        />
                        <label id="form_label" htmlFor="petDescription">
                            Pet's description:
                        </label>
                        <i></i>
                    </div>

                    <div className="input-box">
                        <input
                            className="form_field"
                            id="petGender"
                            type="text"
                            value={petGender}
                            onChange={handlePetGenderChange}
                        />
                        <label id="form_label" htmlFor="petGender">
                            Pet's gender:
                        </label>
                        <i></i>
                    </div>
                    <input id="submit" type="submit" value="Add your pet"/>
                </form>

                {error && <div className="error">{error}</div>}
            </div>
        </main>
    );
};

export default EditProfile;
