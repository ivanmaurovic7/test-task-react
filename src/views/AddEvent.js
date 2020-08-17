import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../store/actions/dashboardActions'
import { useHistory } from 'react-router-dom'
import Logo from './../components/Logo'
import { Card, TextField, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const AddEvent = ({ user, loading, addEvent }) => {
  const history = useHistory()

  useEffect(() => {
    if(!localStorage.getItem('eventio_access_token') || !localStorage.getItem('eventio_refresh_token')) {
      history.push('/')
    }
  }, [])

  const currentDate = new Date(new Date().getTime()+1000*24*60*60)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(currentDate.toISOString().split('T')[0])
  const [time, setTime] = useState(currentDate.toLocaleTimeString().slice(0, currentDate.toLocaleTimeString().length-3))
  const [capacity, setCapacity] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
  }, [title, description, date, time, capacity])

  const addNewEvent = () => {
    if(title === '' || description === '' || date === '' || time === '' || capacity === '') {
      setError('All fields are required')
      return
    }

    if(new Date(date).getTime() < new Date().getTime()+1000*60*60*6) {
      setError('Event must be in the future')
      return     
    }

    addEvent({title, description, startsAt: new Date(date+' '+time).toISOString(), capacity})
  }

  return (
    <div className="addEventPage">
      <div className="navbar">
        <Logo dark />
        <Button
          onClick={() => history.push('/dashboard')}
          color="action"
          startIcon={<CloseIcon className="closeIcon"/>}
        >
          <span className="closeLabel">Close</span>
        </Button>
      </div>
      <Card className="addEvent" noValidate autoComplete="off">
        <h3>Create new event</h3>
        <small style={{color: error ? '#ff4081' : '#949ea8', fontWeight: error ? '600' : ''}}>{error || 'Enter your details below'}</small>
        <TextField error={error ? true : false} value={title} onChange={e => setTitle(e.target.value)} className="inputComponent" label="Title" />
        <TextField error={error ? true : false} value={description} onChange={e => setDescription(e.target.value)} className="inputComponent" label="Description" />
        <TextField
          error={error ? true : false}
          className="inputComponent" 
          label="Date"
          type="date"
          value={date} 
          onChange={e => setDate(e.target.value)} 
          defaultValue={date}
        />
        <TextField
          error={error ? true : false}
          className="inputComponent"
          label="Time"
          type="time"
          value={time} 
          onChange={e => setTime(e.target.value)} 
          defaultValue={time}
        />
        <TextField error={error ? true : false} value={capacity} onChange={e => setCapacity(e.target.value)} type="number" className="inputComponent" label="Capacity" />
        <Button disabled={loading} style={{backgroundColor: loading ? 'rgba(0, 0, 0, 0.12)' : '', color: loading ? '#333' : ''}} onClick={() => addNewEvent()} className="buttonComponent" size="large">Create new event</Button>
      </Card>
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.dashboard.loading,
  user: state.dashboard.user
})

const mapActionsToProps = ({
  addEvent
})

export default connect(mapStateToProps, mapActionsToProps)(AddEvent)