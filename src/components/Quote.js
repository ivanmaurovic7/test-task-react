import React from 'react'
import Logo from './Logo'

const Quote = () => {
    return (
        <div className="quoteComponent">
            <Logo cName="logo"/>
            <Logo cName="logoMobile" dark />
            <div className="leftContent">
            <h2>"Great, kid. Don't get cocky."</h2>
            <hr/>
            <small>Han Solo</small>
            </div>
        </div>
    )
}

export default Quote