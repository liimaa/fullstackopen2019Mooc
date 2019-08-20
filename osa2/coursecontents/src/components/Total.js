import React from 'react'

const Total = ({parts}) => {
  
  const total = parts.reduce((a, b) => a += b.exercises, 0)

  return (
    <div>
      <p>
        <b>All exercises {total}</b>
      </p>
    </div>
  )
}

export default Total