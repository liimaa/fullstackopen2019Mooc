import React from 'react'
import Part from '../components/Part'

const Content = ({parts}) => {
  return (
    <div>
      {
        parts.map(part => 
         <Part key={part.name} {...part}></Part>)
      }
    </div>
  )
}

export default Content