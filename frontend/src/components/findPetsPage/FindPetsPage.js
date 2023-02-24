import React, {useEffect, useState} from 'react';
import './FindPetsPage.css'
import {Pet} from '../pet/Pet.js'

const FindPetsPage = ({navigate}) => {
    const [pets, setPets] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            // TODO: Update fetch url
            fetch("/pets", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(async data => {
                    window.localStorage.setItem("token", data.token)
                    setToken(window.localStorage.getItem("token"))
                    // TODO: Update data.{objectName}
                    setPets(data.pets);
                })
        }
    }, [token, pets]);

    if (token) {
        return (
            <div className='find-pets-title-div'>
                <h2 className='post-title'>Find Pets</h2>
                <div id='find-pets' role="find-pets">
                    {pets.map(
                        (pet) => (<Pet pet={pet} key={pet._id}/>)
                    )}
                </div>
            </div>
        )
    } else {
        navigate('/login')
    }
}

export default FindPetsPage;