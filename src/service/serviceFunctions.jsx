import { URL } from "./config";
import axios from "axios";

export const ServiceFunctions = {
  newOrder: async (orderData, setError) => {
    try {
      const response = await axios.post(`${URL}/order/add`, orderData);

      if (response.status === 200) {
        console.log("Заказ успешно создан:", response.data);
        return response.data; // Возвращаем данные заказа или статус
      } else {
        console.error("Ошибка при создании заказа:", response);
        return null;
      }
    } catch (error) {
      setError(error);
      console.error("Ошибка при отправке запроса:", error);
      return null;
    }
  },

  getCategories: async () => {
    const res = await fetch(URL + "/category/all", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  },

  addCategory: async (name) => {
    const res = await fetch(URL + "/category/new", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    });
    const data = await res.json();
    return data;
  },

  deleteCategory: async (id, token) => {
    const res = await fetch(URL + "/category/" + id, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    return data;
  },

  getAllOrders: async (token) => {
    const res = await fetch(URL + "/order/all", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    return data;
  },

  getOrder: async (id, token) => {
    const res = await fetch(URL + "/order/" + id, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    return data;
  },

  // PRODUCTS
  getOneProduct: async (id) => {
    const res = await fetch(URL + "/product/" + id, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  },

  getProductsByCategory: async (category) => {
    const res = await fetch(URL + "/product/category/" + category, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  },

  getAllProducts: async () => {
    const res = await fetch(URL + "/product/all", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  },

  deleteOrder: async (id, token) => {
    const res = await fetch(URL + "/delete/order/" + id, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    return data;
  },

  deleteProduct: async (id, token) => {
    const res = await fetch(URL + "/product/" + id, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    return data;
  },

  updateProduct: async (id, obj, token) => {
    const res = await fetch(URL + "/product/" + id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(obj),
    });
    const data = await res.json();
    return data;
  },

  createProduct: async (token, productData) => {
    try {
      const response = await axios.post(`${URL}/product/new`, productData, {
        headers: {
          authorization: `Bearer ${token}`, // Передаем токен авторизации
        },
      });

      if (response.status === 201) {
        console.log("Продукт успешно создан:", response.data);
        return response.data; // Возвращаем данные о продукте или статус
      } else {
        console.error("Ошибка при создании продукта:", response);
        return null;
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      return null;
    }
  },
};
