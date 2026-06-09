import { BASE_API } from "../utils/constants";

export async function getPatrocinadorsApi() {
  try {
    const url = `${BASE_API}/api/patrocinadors/`;

    const response = await fetch(url);

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function createPatrocinadorApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("nom", data.nom);
    formData.append("email", data.email);
    formData.append("numCompte", data.numCompte);
    formData.append("path_imatge", data.path_imatge);
    formData.append("telefon", data.telefon);
    formData.append("direccio", data.direccio);
    formData.append("actiu", data.actiu);
    formData.append("link", data.link);

    const url = `${BASE_API}/api/patrocinadors/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function updatePatrocinadorApi(id, data, token) {
  try {
    const formData = new FormData();
    formData.append("nom", data.nom);
    formData.append("email", data.email);
    formData.append("numCompte", data.numCompte);
    if (data.path_imatge) formData.append("path_imatge", data.path_imatge);
    formData.append("telefon", data.telefon);
    formData.append("direccio", data.direccio);
    formData.append("actiu", data.actiu);
    formData.append("link", data.link);
    const url = `${BASE_API}/api/patrocinadors/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function deletePatrocinadorApi(id, token) {
  try {
    const url = `${BASE_API}/api/patrocinadors/${id}/`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
