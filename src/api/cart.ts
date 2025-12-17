import axiosInstance from "./axios";

export const getCartApi = () => {
  return axiosInstance.get("/cart");
};

export const updateCartApi = (cartItemId: string, quantity: number) => {
  return axiosInstance.put(`/cart/${cartItemId}`, { quantity });
};

export const deleteCartItemApi = (cartItemId: string) => {
  return axiosInstance.delete(`/cart/${cartItemId}`);
};
