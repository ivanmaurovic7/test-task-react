import axios from 'axios'
import {
    LOADING,
    FETCHED_EVENTS,
    CHANGE_DISPLAY_TYPE,
    CHANGE_FILTER,
    LOGOUT,
    ADD_EVENT,
} from '../actions/types'

import { push } from 'connected-react-router'

import APIKey from '../../utils/APIKey'

export const fetchEvents = () => async dispatch => {
  dispatch({
    type: LOADING
  })

  try {
    const getEvents = await axios.get('https://testproject-api-v2.strv.com/events',
    {
      headers: {
        'Content-Type': 'application/json',
        'APIKey': APIKey,
      }
    })
    
    dispatch({
        type: FETCHED_EVENTS,
        // payload: getEvents.events
        payload: getEvents.data
    })
  } catch (e) {}
}

export const changeDisplayType = t => {
    return {
        type: CHANGE_DISPLAY_TYPE,
        payload: t
    }
}

export const changeFilter = f => {
    return {
        type: CHANGE_FILTER,
        payload: f
    }
}

export const logout = () => dispatch => {
  localStorage.removeItem('eventio_token')

  dispatch({
    type: LOGOUT
  }) 

  dispatch(push('/'))
}

export const addEvent = event => async dispatch => {
  dispatch({
    type: LOADING
  })

  await axios.post('https://testproject-api-v2.strv.com/events', event, {
    headers: {
      'Content-Type': 'application/json',
      'APIKey': APIKey,
      'Authorization': localStorage.getItem('eventio_access_token')
    }
  })

  dispatch(push('/dashboard'))
}

export const startLoader = () => ({
  type: LOADING
})