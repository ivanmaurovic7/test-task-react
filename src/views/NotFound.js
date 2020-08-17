import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Quote from '../components/Quote'
import { Button } from '@material-ui/core'

const NotFound = () => {
  const history = useHistory()

  return (
    <div className="notFoundPage">
      <Quote />
      <div className="notFoundContentContainer">
        <div className="notFoundContent">
            <h3>404 Error - page not found</h3>
            <small>Seems like Darth Vader just hits our website and drops it down. Please press the refresh button and everything should be fine again.</small>
            <Button onClick={() => history.push('/')} color="action" className="buttonComponent">Refresh</Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound