import React from 'react'

const FilterForm = ({value, onChange}) => {
  return(
    <div>
      filter persons: <input value={value} onChange={onChange} />
    </div>
  )
}

export default FilterForm