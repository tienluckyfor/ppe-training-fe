import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import Alert from "../components/Alert";

export const initialState = {
    lPosts: [] // list posts
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setData: (state, { payload }) => {
            Object.entries(initialState).map(([key, value], i) => {
                if (typeof payload[key] !== "undefined") {
                    state[key] = payload[key];
                }
            })
        },
        setMerge: (state, { payload }) => {
            Object.entries(initialState).map(([key, value], i) => {
                if (typeof payload[key] !== "undefined") {
                    state[key] = { ...state[key], ...payload[key] }
                }
            })
        },
    },
});


export const { setData, setMerge } = postsSlice.actions
export const postsSelector = (state) => state.posts
export default postsSlice.reducer

export function setPost(data) {
    return async (dispatch) => {
        dispatch(setData(data))
    };
}

export function setPostMerge(key, data) {
    return async (dispatch) => {
        dispatch(setMerge({ ...{}, [key]: data }))
    }
}

const cookies = new Cookies();
const setHeader = {
    headers: {
        Authorization: "Bearer " + cookies.get("ppe-training-fe-token"),
    },
};

export function createPost(e) {
    e.preventDefault();
    return async (dispatch) => {
        const payload = new FormData(e.target);
        axios
            .post(`${process.env.REACT_APP_API_URL}/posts`, payload, setHeader)
            .then(function (response) {
                if (response.data.status) {
                    Alert({ t: `success`, c: [`Create post success`] });
                } else {
                    Alert({ t: `error`, c: [response.data.message] });
                }
                console.log(response);
            })
            .catch(function (error) { });
    }
}

export function deletePost(post) {
    return async (dispatch) => {
        axios
            .delete(
                `${process.env.REACT_APP_API_URL}/posts/${post.id}`,
                setHeader
            )
            .then(function (response) {
                if (response.data.status) {
                    dispatch(listPost())
                } else {
                    Alert({ t: `error`, c: [response.data.message] });
                }
            })
            .catch(function (error) { });
    }
}

export function listPost() {
    return async (dispatch) => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/posts`, {
                headers: setHeader.headers,
            })
            .then(function (response) {
                // setPosts(response?.data?.data);
                dispatch(setData({ lPosts: response?.data?.data }))
            })
            .catch(function (error) { });
    }
}

