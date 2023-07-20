import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: { name: "gim", age: 1 },
  reducers: {
    changeUser(state) {
      state.name = "park";
    },
    increaseAge(state, action) {
      state.age += action.payload;
    },
  },
});

export let { changeUser, increaseAge } = user.actions;

export default user;
