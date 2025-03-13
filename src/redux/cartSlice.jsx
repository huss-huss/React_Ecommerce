import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.totalQuantity++;
      state.totalPrice += action.payload.price;
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity++;
        existingProduct.totalPrice += action.payload.price;
      } else {
        state.products.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const findItem = state.products.find((product) => product.id === id);
      if (findItem) {
        state.totalQuantity -= findItem.quantity;
        state.totalPrice -= findItem.totalPrice;
        state.products = state.products.filter((product) => product.id !== id);
      }
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const findItem = state.products.find((product) => product.id === id);
      if (findItem) {
        findItem.quantity++;
        findItem.totalPrice += findItem.price;
        state.totalQuantity++;
        state.totalPrice += findItem.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const findItem = state.products.find((product) => product.id === id);
      if (findItem) {
        findItem.quantity--;
        findItem.totalPrice -= findItem.price;
        state.totalQuantity--;
        state.totalPrice -= findItem.price;
        if (findItem.quantity === 0) {
          state.products = state.products.filter(
            (product) => product.id !== id
          );
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
