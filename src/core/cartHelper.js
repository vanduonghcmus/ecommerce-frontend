export const addItem = (item, next) => {
  let cart = [];

  if (typeof window !== "undefined") {
    // check and get cart in localStorage
    if (window.localStorage.getItem("cart")) {
      cart = JSON.parse(window.localStorage.getItem("cart"));
    }

    // push new item into cart
    cart.push({
      ...item,
      count: 1,
    });

    /**
     * remove duplicate
     * build an Array form new Set and turn it back into array using Array.from
     * so that later we can re-map it
     * new set will only allow unique values in it
     * so pass the ids of each obj/array
     * if the loop tries to add the same value again , i'll get ignore
     * ...with of array of ids i got the first map() was used
     * run map() on it again and return the actual product form cart
     */
    cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
      return cart.find((p) => p._id === id);
    });

    window.localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const totalItem = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }

  return 0;
};

export const getCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }

  return [];
};

export const updateItem = (productId, count) => {
  let cart = [];

  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(window.localStorage.getItem("cart"));
    }
    cart.forEach((product, i) => {
      if (product._id === productId) {
        cart[i].count = count;
      }
    });

    window.localStorage.setItem("cart", JSON.stringify(cart));
  }

  return cart;
};
export const removeItem = (productId) => {
  let cart = [];

  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(window.localStorage.getItem("cart"));
    }
    cart.forEach((product, i) => {
      if (product._id === productId) {
        cart.splice(i, 1);
      }
    });

    window.localStorage.setItem("cart", JSON.stringify(cart));
  }

  return cart;
};

export const emptyCart = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
    next();
  }
};
