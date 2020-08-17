import React, { useState } from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { Menu, MenuItem, Button } from '@material-ui/core'

const UserMenu = props => {
    const {logout, userData} = props

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
    }
  
    const handleClose = () => {
      setAnchorEl(null)
    }

    return (
        <div className="userMenu">
            <div className="userLogo">
                <span>{userData ? userData.firstName.slice(0,1) + userData.lastName.slice(0,1) : null}</span>
            </div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <span className="userName">{userData ? userData.firstName+" "+userData.lastName : ''}</span>
                <ArrowDropDownIcon className="userMenuIcon" />
            </Button>
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
                <MenuItem onClick={() => { handleClose(); }}>My profile</MenuItem>
                <MenuItem onClick={() => { logout(); handleClose(); }}>Logout</MenuItem>
            </Menu>
        </div>
    )
}

export default UserMenu