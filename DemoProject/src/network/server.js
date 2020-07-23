var hitGetAPI = async function (URL) {
  return fetch(URL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((response) => Promise.all([response, response.json()]));
};

export {hitGetAPI};
