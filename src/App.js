import React, { useEffect } from 'react'
import {
  Switch,
  Route,
} from "react-router-dom"
import { ConnectedRouter } from 'connected-react-router'
import store, {history} from './store'
import { Provider } from 'react-redux'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import AddEvent from './views/AddEvent'
import NotFound from './views/NotFound'
import axios from 'axios'
import './App.sass'
import APIKey from './utils/APIKey'

import { setUser } from './store/actions/authActions'

function App() {
  useEffect(() => {
    (async () => {
      const refreshToken = localStorage.getItem('eventio_refresh_token')
      if(refreshToken) {
        let userData = await axios.post('https://testproject-api-v2.strv.com/auth/native', { refreshToken }, {
          headers: {
            'Content-Type': 'application/json',
            'APIKey': APIKey,
          }
        })
        localStorage.setItem('eventio_access_token', userData.headers['authorization'])
        store.dispatch(setUser(userData.data))
      }
    })()
  }, [])

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route path="/dashboard">
            <Dashboard/>
          </Route>
          <Route path="/add-event">
            <AddEvent/>
          </Route>
          <Route path="/">
            <NotFound/>
          </Route>
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
}

export default App