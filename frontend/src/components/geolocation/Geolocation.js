import React, {useEffect, useState} from 'react';

const Geolocation = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async position => {
            let loca = fetch(`https://api.postcodes.io/postcodes?lon=${position.coords.longitude}&lat=${position.coords.latitude}`)
                .then(response => response.json())
                .then(data => {
                    setLocation(data.result);
                    setLocation(data.result[0].parliamentary_constituency);
                });

        }, error => {
            setError(error.message);
        });
    }, []);

    return (<div>
        {location ? (<div>
            location: {location}
        </div>) : (<div>Getting location...</div>)}
        {error && <div>Error: {error}</div>}
    </div>);
}


export default Geolocation;

