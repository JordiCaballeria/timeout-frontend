import { BASE_API } from "../utils/constants";
import { toast } from "react-toastify";
import { removeToken } from "./token";

export async function loginApi(formData) {
  try {
    const url = `${BASE_API}/api/auth/login/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    if (response.status !== 200) removeToken();
    if (response.status === 401) {
      removeToken();
      throw new Error("Usuario o contraseña incorrectos");
    }
    if (response.status === 403) {
      throw new Error("Compte no activada");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getMeApi(token) {
  try {
    const url = `${BASE_API}/api/auth/me/`;
    const params = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    if (response.status === 401) {
      removeToken();
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getUsersApi(token) {
  try {
    const url = `${BASE_API}/api/users/`;
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

export async function getResumApi(token) {
  try {
    const url = `${BASE_API}/api/resum/`;
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

export async function getJugadoresApi(token) {
  try {
    const url = `${BASE_API}/api/jugadores/`;
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

export async function getEntrenadoresApi(token) {
  try {
    const url = `${BASE_API}/api/entrenadores/`;
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

export async function createUserApi(data) {
  try {
    const url = `${BASE_API}/api/users/`;
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

export async function createSociApi(data, token) {
  try {
    const url = `${BASE_API}/api/nou_soci/`;
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

export async function imatgeUserApi(imatge, idUser) {
  try {
    const data = new FormData();
    data.append("path_photo", imatge);
    const url = `${BASE_API}/api/imageusers/${idUser}/photo/`;
    const params = {
      method: "PUT",
      body: data,
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function updateUserApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/users/${id}/`;
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

export async function deleteUserApi(id, token) {
  try {
    const url = `${BASE_API}/api/users/${id}/`;
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

export async function updateRolsUserApi(data, token) {
  try {
    const url = `${BASE_API}/api/updaterols/`;
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

export async function getRolsUserApi(id, token) {
  try {
    const url = `${BASE_API}/api/rolusuari/?rol=${id}`;
    const params = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function sendMailApi(data, token) {
  try {
    const url = `${BASE_API}/api/enviar-email/`;
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

export async function registerUserApi(data) {
  try {
    const url = `${BASE_API}/api/register/`;
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
    toast.error(error);
    throw error;
  }
}

export async function recuperarPasswordApi(data) {
  try {
    const url = `${BASE_API}/api/password_reset/`;
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
export async function enviarConacteApi(data) {
  try {
    const url = `${BASE_API}/api/enviar_contacte/`;
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
