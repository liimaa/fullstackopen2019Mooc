import React from 'react'

const Total = ({parts}) => {
  var sum = 0;
  parts.map(part => sum += part.exercises)
  return (
    <div>
      <p>
        <b>All exercises {sum}</b>
      </p>
    </div>
  )
}

export default Total