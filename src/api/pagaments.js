import { BASE_API } from "../utils/constants";

export async function getPagamentsApi(token) {
  try {
    const url = `${BASE_API}/api/pagaments/`;
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

export async function getTipusPagamentsApi(token) {
  try {
    const url = `${BASE_API}/api/tipuspagaments/`;
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

export async function createPagamentApi(data, token) {
  try {
    const url = `${BASE_API}/api/crear_pagament/`;
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

export async function createPagamentStripeApi(total, paymentMethod, token) {
  try {
    const url = `${BASE_API}/api/pagament_stripe/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payment_method_id: paymentMethod.id,
        amount: total,
      }),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
export async function updatePagamentApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/pagaments/${id}/`;
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
export async function deletePagamentApi(id, token) {
  try {
    const url = `${BASE_API}/api/pagaments/${id}/`;
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
