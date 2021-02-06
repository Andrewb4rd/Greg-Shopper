import axios from "axios";

export async function getAllDucks() {
  try {
    const { data } = await axios.get("/api/ducks");
    return data.ducks;
  } catch (error) {
    throw error;
  }
}

export async function getAllOrders() {
  try {
    const { data } = await axios.get("/api/orders");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getDuckById(id) {
  try {
    const { data } = await axios.get(`/api/ducks/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function register(credentials) {
  try {
    const { data } = await axios.post("/api/users/register", credentials);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function login(credentials) {
  try {
    const { data } = await axios.post("/api/users/login", credentials);
    return data;
  } catch (error) {
    throw error;
  }
}
