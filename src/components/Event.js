import React from 'react'
import { Card, CardContent, CardActions, Typography, Button } from '@material-ui/core'
import Person from '@material-ui/icons/Person'
import axios from 'axios'
import APIKey from '../utils/APIKey'
const Event = props => {
    const { startLoader, fetchEvents, userId, event, displayType } = props

    const leaveEvent = async () => {
        startLoader()
        
        await axios.delete(`https://testproject-api-v2.strv.com/events/${event.id}/attendees/me`, {
            headers: {
                'Content-Type': 'application/json',
                'APIKey': APIKey,
                'Authorization': localStorage.getItem('eventio_access_token')
            }
        })

        fetchEvents()
    }

    const joinEvent = async () => {
        startLoader()

        await axios.post(`https://testproject-api-v2.strv.com/events/${event.id}/attendees/me`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'APIKey': APIKey,
                'Authorization': localStorage.getItem('eventio_access_token')
            }
        })

        fetchEvents()
    }

    return (
        <Card className={'event '+ displayType}>
            <CardContent className="eventDetails">
                <small className="date">
                    {new Date(event.startsAt).toLocaleString()}
                </small>
                <span className="title">
                    {event.title}
                </span>
                <span className="author">
                    {event.owner.firstName +" "+event.owner.lastName}
                </span>
                <p className="description">
                    {event.description.slice(0, displayType === 'grid' ? 50 : 20) + '...'}
                </p>
            </CardContent>
            <CardActions className="cardActions">
                <div className="attendants">
                    <Person className="icon"/>
                    <span>{event.attendees.length} of {event.capacity}</span>
                </div>
                {
                    event.owner.id === userId ? <Button size="small" variant="contained" color="primary">Edit</Button> : (
                        event.attendees.some(a => a.id === userId) ? 
                        <Button onClick={leaveEvent} size="small" variant="contained" color="secondary">Leave</Button> : (
                            event.capacity > event.attendees.length ? <Button onClick={() => { if(event.attendees.length !== event.capacity) joinEvent() }} size="small" variant="contained" style={{backgroundColor: "#22d486"}}>Join</Button> : null
                        )
                    )
                }
            </CardActions>
        </Card>
    )
}

export default Event