import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:5500";
const configAuth = {
  withCredentials: true,
};

export const getAllPets = async (url) => {
  try {
    const allPetData = await axios.get(`${baseURL}/pets/pet/${url || ""}`);
    return allPetData.data.pets;
  } catch (err) {
    return err.response;
  }
};

export const getUsersAllPets = async (userID) => {
  try {
    const allPetData = await axios.get(
      `${baseURL}/pets/pet/user/${userID}`,
      configAuth
    );
    return allPetData.data.pets;
  } catch (err) {
    return err.response;
  }
};

export const addPet = async (pet) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  };
  try {
    const response = await axios.post(`${baseURL}/pets/pet`, pet, config);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const signUpToServer = async (newUser) => {
  try {
    const response = await axios.post(`${baseURL}/users/signup`, newUser);
    Cookies.set("token", response.data);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const loginToServer = async (info) => {
  try {
    const response = await axios.post(`${baseURL}/users/login`, info);
    Cookies.set("token", response.data, { expires: 7 });
    return response;
  } catch (err) {
    return err.response;
  }
};

export const updateUserData = async (id, updatedData) => {
  try {
    const response = await axios.put(
      `${baseURL}/users/user/${id}`,
      updatedData,
      configAuth
    );
    Cookies.remove("token");
    Cookies.set("token", response.data.token, { expires: 7 });
    return response;
  } catch (err) {
    return err.response;
  }
};

export const adoptOrFosterPet = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/pets/pet/${data.petID}/adopt`,
      data,
      configAuth
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export const returnPet = async (petID) => {
  try {
    const response = await axios.post(
      `${baseURL}/pets/pet/${petID}/return`,
      petID,
      configAuth
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export const editPet = async (editedPet, petID) => {
  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  };
  try {
    const response = await axios.put(
      `${baseURL}/pets/pet/${petID}`,
      editedPet,
      config
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export const getSinglePet = async (petID) => {
  try {
    const allPetData = await axios.get(`${baseURL}/pets/pet/${petID}`);
    return allPetData.data.pet[0];
  } catch (err) {
    return err.response;
  }
};

export const addPetToSavedPets = async (pet) => {
  try {
    const response = await axios.post(
      `${baseURL}/pets/pet/${pet.petID}/save`,
      pet,
      configAuth
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export const removePetFromSavedPets = async (pet) => {
  const config = {
    withCredentials: true,
    data: pet,
  };
  try {
    const response = await axios.delete(
      `${baseURL}/pets/pet/${pet.petID}/save`,
      config
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export const getSingleUser = async (ownerID) => {
  try {
    const singleUser = await axios.get(
      `${baseURL}/users/user/${ownerID}`,
      configAuth
    );
    return singleUser.data.user[0];
  } catch (err) {
    return err.response;
  }
};

export const getAllUsers = async () => {
  try {
    const allUsersData = await axios.get(`${baseURL}/users/user/`, configAuth);
    return allUsersData.data.users;
  } catch (err) {
    return err.response;
  }
};

export const getSingleUserFull = async (ownerID) => {
  try {
    const singleUser = await axios.get(
      `${baseURL}/users/user/${ownerID}/full`,
      configAuth
    );
    return singleUser.data;
  } catch (err) {
    return err.response;
  }
};

export const getUserSavedPet = async (userID) => {
  try {
    const userSavedPet = await axios.get(
      `${baseURL}/pets/pet/saved/${userID}`,
      configAuth
    );
    return userSavedPet.data;
  } catch (err) {
    return err.response;
  }
};
