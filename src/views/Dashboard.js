import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { startLoader, fetchEvents, changeDisplayType, changeFilter, logout } from '../store/actions/dashboardActions'
import { useHistory } from 'react-router-dom'
import Event from './../components/Event'
import Logo from './../components/Logo'
import UserMenu from './../components/UserMenu'
import FilterButtonsMobile from './../components/FilterButtonsMobile'
import { CircularProgress, IconButton, ButtonGroup, Button } from '@material-ui/core'
import ViewStreamIcon from '@material-ui/icons/ViewStream'
import ViewModuleIcon from '@material-ui/icons/ViewModule'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'

const Dashboard = ({ startLoader, user, events, displayType, filter, loading, fetchEvents, changeDisplayType, changeFilter, logout }) => {
  const history = useHistory()

  useEffect(() => {
    if(!localStorage.getItem('eventio_access_token') || !localStorage.getItem('eventio_refresh_token')) {
      history.push('/')
    } else {
      fetchEvents()
    }
  }, [])

  const filterOptions = [
      {
          label: 'All events',
          value: null
      },
      {
          label: 'Future events',
          value: 'future'
      },
      {
          label: 'Past events',
          value: 'past'
      }
  ]

  return (
    <div className="dashboardPage">
      <div className="navbar">
        <Logo dark />
        <UserMenu logout={logout} userData={user} />
      </div>
      <div className="eventDisplayBar">
        <FilterButtonsMobile filterOptions={filterOptions} filter={filter} changeFilter={changeFilter} />
        <ButtonGroup variant="text" className="filterButtons">
          { filterOptions.map(option => {
            return <Button key={option.value} onClick={() => changeFilter(option.value)} style={{fontWeight: filter === option.value ? 'bold' : ''}}>{option.label}</Button>
          }) }
        </ButtonGroup>
        <ButtonGroup variant="text" className="displayButtons">
          <IconButton onClick={() => changeDisplayType('grid')}>
            <ViewModuleIcon color={displayType === 'grid' ? 'action' : 'disabled'}/>
          </IconButton>
          <IconButton onClick={() => changeDisplayType('list')}>
            <ViewStreamIcon color={displayType === 'list' ? 'action' : 'disabled'}/>
          </IconButton>
        </ButtonGroup>
      </div>
      <div className="events" style={{height: loading ? '50vh' : ''}}>
        { !loading ? events.filter(event => filter ? (filter === 'future' ? new Date(event.startsAt).getTime() > new Date().getTime() : new Date(event.startsAt).getTime() < new Date().getTime()) : event).map(event => <Event key={event.id} startLoader={startLoader} fetchEvents={fetchEvents} userId={user ? user.id : null} displayType={displayType} event={event} />) : <CircularProgress className="loader" color="inherit" /> }
      </div>
      <div className="addEventContainer" onClick={() => history.push('/add-event')}>
        <AddCircleRoundedIcon className="addEvent" />
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  events: state.dashboard.events,
  displayType: state.dashboard.displayType,
  filter: state.dashboard.filter,
  loading: state.dashboard.loading,
  user: state.auth.user
})

const mapActionsToProps = ({
  fetchEvents, changeDisplayType, changeFilter, logout, startLoader
})

export default connect(mapStateToProps, mapActionsToProps)(Dashboard)