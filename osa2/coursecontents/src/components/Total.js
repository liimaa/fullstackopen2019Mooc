import React from 'react'

const Total = ({parts}) => {
  var sum = 0;
  parts.map(part => sum += part.exercises)
  return (
    <div>
      <p>
        All courses {sum}
      </p>
    </div>
  )
}

export default Total