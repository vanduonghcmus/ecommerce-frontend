import { API } from "../config";
import queryString from "query-string";

export const getProducts = async (sortBy) => {
  try {
    const res = await fetch(
      `${API}/products?sortBy=${sortBy}&order=desc&limit=6`,
      {
        method: "GET",
      }
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  try {
    const res = await fetch(`${API}/categories`, {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredProducts = async (skip, limit, filters = {}) => {
  const payload = {
    skip,
    limit,
    filters,
  };
  try {
    const res = await fetch(`${API}/products/by/search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

/**
 *
 * @param {*} payload {search: undefined || string, category:string}
 * @returns data from db
 */
export const list = async (payload) => {
  const query = queryString.stringify(payload);

  try {
    const res = await fetch(`${API}/products/search?${query}`, {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const read = async (productId) => {
  try {
    const res = await fetch(`${API}/product/${productId}`, {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const listRelated = async (productId) => {
  try {
    const res = await fetch(`${API}/products/related/${productId}`, {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export const getBraintreeClienToken = async (userId, token) => {
  try {
    const res = await fetch(`${API}/braintree/getToken/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const processPayment = async (userId, token, paymentData) => {
  try {
    const res = await fetch(`${API}/braintree/payment/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export const createOrder = async (userId, token, createOrderData) => {
  try {
    const res = await fetch(`${API}/order/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ order: createOrderData }),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
