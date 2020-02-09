import { GET_POSTS, POST_ERROR } from '../actions/types';
const initislState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function (state = initislState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}