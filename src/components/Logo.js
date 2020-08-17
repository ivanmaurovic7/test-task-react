import React from 'react'

const Logo = props => {
    return (
        <img alt="logo" className={'logo '+props.cName} src={require(props.dark ? './../assets/images/logo_dark.png' : './../assets/images/logo.png')}/>
    )
}

export default Logo