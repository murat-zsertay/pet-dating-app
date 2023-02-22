import React, { useEffect, useState } from 'react';
import './findPetsPage.css'

const FindPetsPage = ({ navigate }) => {
  const [petProfiles, setPetProfiles] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token && (petProfiles.length === 0)) {
        // TODO: Update fetch url
        fetch("/petProfiles", {
            headers: {
            'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          // TODO: Update data.{objectName}
          setPetProfiles(data.petProfiles);
        })
    }
  }, [token, petProfiles]);
  
    if(token) {
      return(
        <>
            <div className='find-pets-title-div'>
          {/* <h2 className='post-title'>Posts</h2> */}
          <div id='find-pets' role="find-pets">
              {petProfiles.map(
                (petProfile) => ( <PetProfile petProfile={ petProfile } key={ petProfile._id } /> )
              )}
          </div>
          </div>
        </>
      )
    } else {
      navigate('/login')
    }
}

export default FindPetsPage;