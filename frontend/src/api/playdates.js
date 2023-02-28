export const getPlaydates = async () => {
  try {
      const response = await fetch(`/playdates/requests`, {
          headers: {
              Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          }
      });
      const data = await response.json();
      window.localStorage.setItem("token", data.token);
      return data.requests;
  } catch (error) {
      console.error(error);
  }
};
