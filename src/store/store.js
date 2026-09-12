import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers/rootReducer'

// Vanilla Redux - Redux Toolkit kullanilmiyor.
// redux-logger'in yalnizca CJS build'i var; default import bundler interop'unda
// fonksiyon yerine namespace nesnesi donebiliyor. Bu yuzden createLogger kullaniliyor.
const logger = createLogger({ collapsed: true })

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export default store
