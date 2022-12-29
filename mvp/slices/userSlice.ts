import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { AppDispatch } from "../store";
import { User } from "../types/types";
import { getUser, newUser, updateUser, createFriends, getFriends } from "../../server/src/controllers/users.controller";

interface UserState {
  user: User;
  friends: User[];
}

const initialState: UserState = {
  user: {
    pubKey: "",
    name: "",
    email: "",
    bio: "",
    avatar: "",
    friends: [],
  },
  friends: [],
};

export const userSlice = createSlice({

  name: "user",
  initialState: {
    user: null,
    isLogin: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLogin = false;
    }
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: { user: { user: any; }; }) => state.user.user;

export default userSlice.reducer;