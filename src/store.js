import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import reducer from './ducks/posts'

export default createStore(reducer, applyMiddleware(promiseMiddleware()))