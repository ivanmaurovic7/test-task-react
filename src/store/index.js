import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

const initialState = {}

const middleWare = [routerMiddleware(history), thunk]

const store = createStore(
  rootReducer(history),
  initialState,
  compose(applyMiddleware(...middleWare))
)

export default store
