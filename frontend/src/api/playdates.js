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

export const updatePlaydates = async (answer, request) => {
    console.log(request.requestId)
    console.log(answer)
    try {
        const response = await fetch(`/playdates/requests-response`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({answer: answer, requestId: request.requestId})
        });
        const data = await response.json();
        
        if(data.token) window.localStorage.setItem("token", data.token);
    } catch (error) {
        console.error(error);
    }
}
