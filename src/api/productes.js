import { BASE_API } from "../utils/constants";

export async function getProductesApi() {
  try {
    const url = `${BASE_API}/api/productes/`;
    const response = await fetch(url);

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getProducteByIdApi(id) {
  try {
    const url = `${BASE_API}/api/productes/${id}/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function createProducteApi(
  producte,
  imatgesFilter,
  tallesForm,
  token
) {

  const data = {
    producte,
    talles: tallesForm,
  };

  try {
    const url = `${BASE_API}/api/crear_producte/`;
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
    const formData = new FormData();
    const { id } = result;
    formData.append("producte_id", id);

    for (let i = 0; i < imatgesFilter.length; i++) {
      formData.append("imatges[]", imatgesFilter[i]);
    }

    const url2 = `${BASE_API}/api/insertar_imatges/`;
    const params2 = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const response2 = await fetch(url2, params2);
    const result2 = await response2.json();
    return { result, result2 };
  } catch (error) {
    throw error;
  }
}
export async function updateProducteApi(
  producte_id,
  producte,
  imatges,
  imatgesFilter,
  tallesForm
) {
  const data = {
    producte_id,
    producte,
    imatges,
    talles: tallesForm,
  };
  try {
    const url = `${BASE_API}/api/actualitzar_producte/`;
    const params = {
      method: "POST",
      headers: {
        /*         Authorization: `Bearer ${token}`, */
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, params);
    const result = await response.json();

    const formData = new FormData();
    formData.append("producte_id", producte_id);

    for (let i = 0; i < imatgesFilter.length; i++) {
      formData.append("imatges[]", imatgesFilter[i]);
    }

    const url2 = `${BASE_API}/api/insertar_imatges/`;
    const params2 = {
      method: "POST",
      body: formData,
    };
    const response2 = await fetch(url2, params2);
    const result2 = await response2.json();
    return { result, result2 };
  } catch (error) {
    throw error;
  }
}
export async function deleteProducteApi(id) {
  try {
    const url = `${BASE_API}/api/productes/${id}/`;
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

export async function getTipusProductesApi() {
  try {
    const url = `${BASE_API}/api/tipusproducte/`;
    const response = await fetch(url);

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function createTipusProducteApi(data) {
  try {
    const url = `${BASE_API}/api/tipusproducte/`;
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
export async function updateTipusProducteApi(id, data) {
  try {
    const url = `${BASE_API}/api/tipusproducte/${id}/`;
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
export async function deleteTipusProducteApi(id) {
  try {
    const url = `${BASE_API}/api/tipusproducte/${id}/`;
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
