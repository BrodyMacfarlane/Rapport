import axios from 'axios'

const initialState = {
    posts: {},
    categories: {}
}

const GET_POSTS = 'GET_POSTS'

export function getPosts(){
    const posts = axios.get('/api/getPosts').then(res => res.data)
    return {
        type: GET_POSTS,
        payload: posts
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_POSTS + '_FULFILLED':
            return Object.assign({}, state, {posts: action.payload})
        default:
            return state;
    }
}