export const getUser = () => {
  fetch("/users", {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      window.localStorage.setItem("token", data.token);
      return data.user;
    });
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
