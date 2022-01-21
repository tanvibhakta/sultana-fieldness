const API_URL = "http://3.110.164.79:8000";

export const getUser = (userName) => {
  fetch(`${API_URL}/users/${userName}`).then((response) => {
    console.log(response);
  });
};

export const putUser = (user) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  getUser(user.name);

  fetch(`${API_URL}/users/${user.name}`, requestOptions).then((response) => {
    APIResponse(response);
    //  if response.status = 422
    //  get user by name
    //  validate favorite word
  });
};

export const postSeed = (seed, setter) => {
  const seedObject = getFormData(seed);
  const requestOptions = {
    method: "POST",
    body: seedObject,
  };

  fetch(`${API_URL}/seeds/${seed.seedId}`, requestOptions).then((response) => {
    APIResponse(response, setter);
  });
};

export const APIResponse = (response, setter) => {
  if (response.status === 201) {
    setter && setter(true);
  } else if (response.status === 422) {
    console.error(
      "There is a mismatch between the fields defined in the frontend and backend " +
        "schema. Please contact your administrator."
    );
  } else {
    console.error("Unexpected error. Please check your network connection");
  }
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
