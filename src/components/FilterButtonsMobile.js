import React, { useState } from 'react'
import { Menu, MenuItem, Button } from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const FilterButtonsMobile = props => {
    const {filterOptions, filter, changeFilter} = props

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget)
    }
  
    const handleClose = () => {
      setAnchorEl(null)
    }

    return (
        <div className="filterButtonsMobile">
            <span className="show">SHOW: </span>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                { filterOptions.find(option => option.value === filter).label }
                <ArrowDropDownIcon className="downIcon" />
            </Button>
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            >
            {
                filterOptions.filter(option => option.value !== filter).map(option => {
                    return <MenuItem key={option.value} onClick={() => { changeFilter(option.value); handleClose(); }}>{option.label}</MenuItem>
                })
            }
            </Menu>
        </div>
    )
}

export default FilterButtonsMobile