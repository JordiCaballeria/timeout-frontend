import { BASE_API } from "../utils/constants";

export async function getPermisosApi(token) {
  try {
    const url = `${BASE_API}/api/permisos/`;
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
