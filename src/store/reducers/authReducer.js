import {
  ATTEMPT_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
  LOGOUT,
  SET_USER,
} from '../actions/types'
  
  const initialState = {
    user: null,
    error: null,
    loading: false,
  }
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case ATTEMPT_LOGIN:
        return {
          ...state,
          loading: true,
        }
      case LOGIN_SUCCESS:
        localStorage.setItem('eventio_access_token', action.payload.accessToken)
        localStorage.setItem('eventio_refresh_token', action.payload.refreshToken)
        return {
          ...state,
          user: action.payload.user,
          loading: false,
        }
      case LOGIN_FAIL:
        return {
          ...state,
          error: action.payload,
          loading: false,
        }
      case LOGOUT:
        localStorage.removeItem('eventio_access_token')
        localStorage.removeItem('eventio_refresh_token')
        return {
          ...state,
          userData: null
        }
      case SET_USER:
        return {
          ...state,
          user: action.payload
        }
      case CLEAR_ERROR:
        return {
          ...state,
          error: null
        }
      default:
        return state
    }
  }
  