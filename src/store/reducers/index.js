import { combineReducers } from 'redux'
import authReducer from './authReducer'
import dashboardReducer from './dashboardReducer'
import { connectRouter } from 'connected-react-router'

export default history => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  dashboard: dashboardReducer,
})
