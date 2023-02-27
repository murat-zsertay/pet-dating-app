export const getUserInfoById = async (user_id) => {
    try {
        const response = await fetch(`/users/${user_id}`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            }
        });
        const data = await response.json();
        window.localStorage.setItem("token", data.token);
        return data.user;
    } catch (error) {
        console.error(error);
    }
};



