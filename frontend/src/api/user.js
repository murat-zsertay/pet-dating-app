export const getUser = async () => {
  try {
    const response = await fetch("/users", {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    window.localStorage.setItem("token", data.token);
    return data.user;
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (user_id) => {
  try {
    const response = await fetch(`/users/${user_id}`);
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.log(error);
  }
};

export const getPets = () => {
  getUser().then((user) => user.pets);
};
