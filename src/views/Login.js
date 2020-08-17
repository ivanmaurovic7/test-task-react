import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { login, clearError } from '../store/actions/authActions'
import { Link, useHistory } from 'react-router-dom'
import Quote from './../components/Quote'
import { TextField, Button } from '@material-ui/core'

const Login = ({
  loading,
  error,
  clearError,
  login,
}) => {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    clearError()
  }, [email, password])

  useEffect(() => {
    if(localStorage.getItem('eventio_access_token') && localStorage.getItem('eventio_refresh_token')) {
      history.push('/dashboard')
    }
  }, [])

  return (
    <div className="loginPage">
      <Quote />
      <div className="loginFormContainer">
        <form className="loginForm" noValidate autoComplete="off">
          <h3>Sign in to Eventio</h3>
          <small style={{color: error ? '#ff4081' : '#949ea8', fontWeight: error ? '600' : ''}}>{error || 'Enter your details below'}</small>
          <TextField error={error ? true : false} value={email} onChange={e => setEmail(e.target.value)} className="inputComponent" label="Email" />
          <TextField error={error ? true : false} value={password} onChange={e => setPassword(e.target.value)} className="inputComponent" type="password" label="Password" />
          <div className="signUp">
            <span>Don't have an account?</span><Link to="/signup">SIGN UP</Link>
          </div>
          <Button disabled={loading} style={{backgroundColor: loading ? 'rgba(0, 0, 0, 0.12)' : '', color: loading ? '#333' : ''}} onClick={() => login(email, password)} className="buttonComponent" size="large">Sign in</Button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  user: state.dashboard.user
})

const mapActionsToProps = ({
  clearError,
  login,
})

export default connect(mapStateToProps, mapActionsToProps)(Login)