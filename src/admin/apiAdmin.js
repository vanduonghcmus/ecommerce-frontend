import { API } from "../config";

export const addCategory = async (userId, token, category) => {
  try {
    const res = await fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
export const createProduct = async (userId, token, payload) => {
  try {
    const res = await fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    });
    return res.json();
  } catch (err) {
    console.log(err);
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

export const listOrders = async (userId, token) => {
  try {
    const res = await fetch(`${API}/order/list/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getStatusValues = async (userId, token) => {
  try {
    const res = await fetch(`${API}/order/status-values/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderStatus = async (userId, token, orderId, status) => {
  try {
    const res = await fetch(`${API}/order/${orderId}/status/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, orderId }),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

/**
 * to perform crud product
 * get all products
 * get single product
 * delete single product
 */
export const getProducts = async () => {
  try {
    const res = await fetch(`${API}/products`, {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (productId, userId, token) => {
  try {
    const res = await fetch(`${API}/product/${productId}/${userId}`, {
      method: "DELETE",
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

export const getProduct = async (productId) => {
  try {
    const res = await fetch(`${API}/product/${productId}`, {
      method: "GET",
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (productId, userId, token, product) => {
  try {
    const res = await fetch(`${API}/product/${productId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
