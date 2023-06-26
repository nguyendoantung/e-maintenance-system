import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: undefined,
    isAuth: false,
    accessToken: "",
    encryptedAccessToken: "",
    fcmToken: "",

    isPendingGetMe: false,
    isPendingLogin: false,
    isPendingRegister: false,
    isError: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, _action) => {
            state.isPendingLogin = true;
        },

        loginSuccess: (state, action) => {
            state.isPendingLogin = false;
            state.isError = false;
            state.isAuth = true;
            state.accessToken = action.payload.accessToken;
            state.encryptedAccessToken = action.payload.encryptedAccessToken;
        },

        loginFailed: (state) => {
            state.isPendingLogin = false;
            state.isError = true;
            state.isAuth = false;
            state.currentUser = undefined;
        },

        setFcmToken: (state, action) => {
            state.fcmToken = action.payload;
        },

        getMe: (state) => {
            state.isPendingGetMe = true;
        },

        getMeSuccess: (state, action) => {
            state.isPendingGetMe = false;
            state.isAuth = true;
            state.currentUser = action.payload;
        },

        getMeFailed: (state) => {
            state.isPendingGetMe = false;
            state.isAuth = false;
            state.currentUser = undefined;
        },

        logout: (state) => {
            state.isAuth = false;
            state.currentUser = undefined;
            state.accessToken = "";
            state.accessToken = "";
            state.fcmToken = "";
        },
    },
});

export const { logout } = authSlice.actions;

export const authActions = authSlice.actions;

export const selectIsAuth = (state) => state.auth.isAuth;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectPendingGetMe = (state) => state.auth.isPendingGetMe;
export const selectedAccessToken = (state) => state.auth.accessToken;
export const selectedEncryptedAccessToken = (state) =>
    state.auth.encryptedAccessToken;
export const selectFCMToken = (state) => state.auth.fcmToken;

export default authSlice.reducer;
