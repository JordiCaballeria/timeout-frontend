import { BASE_API } from "../utils/constants";

export async function getNoticiesApi(token) {
  try {
    const url = `${BASE_API}/api/noticies/`;
    const response = await fetch(url);

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getNoticiaByIdApi(id) {
  try {
    const url = `${BASE_API}/api/noticies/${id}/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function createNoticiaApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("titol", data.titol);
    formData.append("subtitol", data.subtitol);
    formData.append("contingut", data.contingut);
    formData.append("path_imatge", data.path_imatge);
    formData.append("activa", data.activa);
    formData.append("data_publicacio", data.data_publicacio);
    formData.append("nomes_jugadors", data.nomes_jugadors);
    formData.append("esdeveniment", data.esdeveniment);
    formData.append("autor", data.autor);
    formData.append("fotograf", data.fotograf);
    const url = `${BASE_API}/api/noticies/`;
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
export async function updateNoticiaApi(id, data, token) {
  try {
    const formData = new FormData();
    formData.append("titol", data.titol);
    formData.append("subtitol", data.subtitol);
    formData.append("contingut", data.contingut);
    if (data.path_imatge) formData.append("path_imatge", data.path_imatge);
    formData.append("activa", data.activa);
    formData.append("data_publicacio", data.data_publicacio);
    formData.append("nomes_jugadors", data.nomes_jugadors);
    if (data.esdeveniment) formData.append("esdeveniment", data.esdeveniment);
    else formData.append("esdeveniment", null);
    formData.append("autor", data.autor);
    formData.append("fotograf", data.fotograf);
    const url = `${BASE_API}/api/noticies/${id}/`;
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
export async function deleteNoticiaApi(id, token) {
  try {
    const url = `${BASE_API}/api/noticies/${id}/`;
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
