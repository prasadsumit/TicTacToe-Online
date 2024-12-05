import React from 'react'

function TextComponent({value}) {

  
  return (
    <div>
        <p>{`Player ${value} turn`}</p>
    </div>
  )
}

export default TextComponent