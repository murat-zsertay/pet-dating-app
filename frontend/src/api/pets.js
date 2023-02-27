export const getAllPets = async (token) => {
        try {
            const res = await fetch(`/pets`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json()
            console.log(data)
            if (!data.pets) {
                return []
            } else {
                return data.pets;
            }
        } catch (error) {
            console.log(error);
        }
    }


;