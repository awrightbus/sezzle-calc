import React from 'react'
import './Clear.css'

function Clear(props) {
    return (
        <div className='clear'
        onClick={() => props.handleClear()}
        >
            {props.children}
        </div>
    )
}

export default Clear
