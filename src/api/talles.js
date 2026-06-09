import { BASE_API } from "../utils/constants";

export async function getTallesApi() {
  try {
    const url = `${BASE_API}/api/talles/`;
    const response = await fetch(url);

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function createTallaApi(data) {
  try {
    const url = `${BASE_API}/api/talles/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function updateTallaApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/talles/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function deleteTallaApi(id) {
  try {
    const url = `${BASE_API}/api/talles/${id}/`;
    const params = {
      method: "DELETE",
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
