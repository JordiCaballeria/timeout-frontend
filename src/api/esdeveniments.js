import { BASE_API } from "../utils/constants";

export async function getEsdevenimentApi(token) {
  try {
    const url = `${BASE_API}/api/esdeveniments/`;
    const params = {
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

export async function getEntradesApi(token) {
  try {
    const url = `${BASE_API}/api/entrades/`;
    const params = {
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

export async function createEsdevenimentApi(data, token) {
  try {
    const url = `${BASE_API}/api/esdeveniments/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
export async function createEntradaApi(data, token) {
  try {
    const url = `${BASE_API}/api/vendre_entrades/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
export async function updateEsdevenimentApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/esdeveniments/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
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
export async function deleteEsdevenimentApi(id, token) {
  try {
    const url = `${BASE_API}/api/esdeveniments/${id}/`;
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

export async function getTipusEsdevenimentApi(token) {
  try {
    const url = `${BASE_API}/api/tipusesdeveniments/`;
    const params = {
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

export async function createTipusEsdevenimentApi(data, token) {
  try {
    const url = `${BASE_API}/api/tipusesdeveniments/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
export async function updateTipusEsdevenimentApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/tipusesdeveniments/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
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
export async function deleteTipusEsdevenimentApi(id, token) {
  try {
    const url = `${BASE_API}/api/tipusesdeveniments/${id}/`;
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
export async function getPartitsApi() {
  try {
    const url = `${BASE_API}/api/partits/`;

    const response = await fetch(url);

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
