const API_URL = "https://api.fieldness.com";

export const checkIfUserExists = (user) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${API_URL}/users/check`, requestOptions);
};

export const getUser = (userName) => {
  return fetch(`${API_URL}/users/${userName}`);
};

export const registerUser = (user) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${API_URL}/users/${user.userName}`, requestOptions);
};

export const postSeed = (seed) => {
  const seedObject = getFormData(seed);
  const requestOptions = {
    method: "POST",
    body: seedObject,
  };

  return fetch(`${API_URL}/seeds/${seed.id}`, requestOptions);
};

/**
 * This function iterates over the given JavaScript object, looking for specific
 * keywords and adjusting the structure to conform to what the API expects.
 * @param object
 * @returns {FormData}
 */
export const getFormData = (object) =>
  Object.keys(object).reduce((formData, key) => {
    if (key === "media") {
      object.media.map((item) =>
        formData.append("uploadMedia[]", item["file"], item["name"])
      );
    } else formData.append(key, object[key]);
    return formData;
  }, new FormData());

// TODO: add a 'bubblenumber' field to the 'answers' object that stores a
//  random number between one and five. This will determine the type of bubble that
//  the seed will look like
