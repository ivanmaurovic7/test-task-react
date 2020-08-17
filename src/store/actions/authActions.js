import axios from 'axios'
import {
  ATTEMPT_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
  LOGOUT,
  SET_USER,
} from './types'

import { push } from 'connected-react-router'

import APIKey from '../../utils/APIKey'

export const login = (email, password) => async dispatch => {
  if(email === '' || password === '') {
    dispatch({
      type: LOGIN_FAIL,
      payload: 'Fields cannot be empty.'
    })
    return
  }

  dispatch({
    type: ATTEMPT_LOGIN
  })

  try {
    const getToken = await axios.post('https://testproject-api-v2.strv.com/auth/native', {
      email, 
      password
    }, 
    {
      headers: {
        'Content-Type': 'application/json',
        'APIKey': APIKey,
      }
    })
    
    const accessToken = getToken.headers['authorization']
    const refreshToken = getToken.headers['refresh-token']
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {accessToken, refreshToken, user: getToken.data}
    })

    dispatch(push('/dashboard'))
  } catch (e) {
    dispatch({
      type: LOGIN_FAIL,
      payload: 'Oops! That username and password combination is not valid.'
    })
  }
}

export const setUser = user => {
  return {
    type: SET_USER,
    payload: user
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  }
}