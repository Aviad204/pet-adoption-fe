import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "http://localhost:5500";

export const getAllPets = async () => {
  const config = {
    withCredentials: true,
  };
  const allPetData = await axios.get(`${baseURL}/pets/pet`, config);
  return allPetData.data.pets;
};

export const getUsersAllPets = async (userID) => {
  const allPetData = await axios.get(`${baseURL}/pets/pet/user/${userID}`);
  return allPetData.data.pets;
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
    console.log(err);
  }
};

export const signUpToServer = async (newUser) => {
  try {
    const response = await axios.post(`${baseURL}/users/signup`, newUser);
    Cookies.set("token", response.data);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const loginToServer = async (info) => {
  try {
    const response = await axios.post(`${baseURL}/users/login`, info);
    Cookies.set("token", response.data, { expires: 7 });

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const updateUserData = async (id, updatedData) => {
  const response = await axios.put(`${baseURL}/users/user/${id}`, updatedData);
  Cookies.remove("token");
  Cookies.set("token", response.data.token, { expires: 7 });
  return response;
};

export const adoptOrFosterPet = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/pets/pet/${data.petID}/adopt`,
      data
    );
    return response;
  } catch (err) {}
};

export const returnPet = async (petID) => {
  try {
    const response = await axios.post(`${baseURL}/pets/pet/${petID}/return`);
    return response;
  } catch (err) {}
};
