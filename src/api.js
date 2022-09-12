const API_URL = "https://api.fieldness.com";
const S3_URL = "https://fieldness.s3.ap-south-1.amazonaws.com";

export const checkIfUserExists = (user) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      favouriteWord: user.favouriteWord,
      userName: user.name,
    }),
  };

  return fetch(`${API_URL}/users/check`, requestOptions);
};

export const getUser = (name) => {
  return fetch(`${API_URL}/users/${name}`);
};

export const registerUser = (user) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${API_URL}/users/${user.name}`, requestOptions);
};

export const postSeed = (seed) => {
  const seedObject = getFormData(seed);
  const requestOptions = {
    method: "POST",
    body: seedObject,
  };

  return fetch(`${API_URL}/seeds/${seed.id}`, requestOptions);
};

export const getSeed = (id) => {
  return fetch(`${API_URL}/seeds/${id}`);
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
        formData.append("uploadMedia", item["file"], item["name"])
      );
    } else if (key === "name") {
      formData.append("userName", object["name"]);
    } else formData.append(key, object[key]);
    return formData;
  }, new FormData());

// TODO: add a 'bubblenumber' field to the 'answers' object that stores a
//  random number between one and five. This will determine the type of bubble that
//  the seed will look like

export const getMedia = (name, seedId, mediaID) => {
  // return fetch(`${S3_URL}/${name}/${seedId}/${mediaID}.mp3`);
  // TODO: you might not need the .mp3 - figure out how to add the appropriate names as given
  //  (why can't the server give it back?)
  return fetch(`${S3_URL}/${name}/${seedId}/${mediaID}`);
};
