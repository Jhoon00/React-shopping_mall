import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";
import { act } from "react-dom/test-utils";

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});
let carts = createSlice({
  name: "carts",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    upCount(state, action) {
      state.find((e) => e.id == action.payload).count += 1;
    },
    pushCart(state, action) {
      let product = {
        id: action.payload.id,
        name: action.payload.title,
        count: 1,
      };
      if (state.find((e) => e.id == action.payload.id)) {
        state.find((e) => e.id == action.payload.id).count += 1;
      } else {
        console.log(state.find((e) => e.id == action.payload.id));
        state.push(product);
      }
    },
    filterCart(state, action) {
      return state.filter((e) => e.id !== action.payload);
    },
  },
});

export let { upCount, pushCart, filterCart } = carts.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    carts: carts.reducer,
  },
});
