const post = async (code, url) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ array: code }),
  };

  console.log("body",requestOptions);

  return fetch(url, requestOptions)
    .then((response) => console.log(response.ok ? "Success" : "Failed" ))
    .catch((error) => {
      // throw error.message;
    });
};

export { post };
