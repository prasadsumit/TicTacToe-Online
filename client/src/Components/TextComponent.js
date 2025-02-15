import React from 'react'

function TextComponent(props) {
    const { value, style } = props
    return (
        <div>
            <p style={style} >{value}</p>
        </div>
    )
}

export default TextComponent
