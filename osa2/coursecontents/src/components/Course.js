import React from 'react'
import Header from '../components/Header'
import Content from '../components/Content'
import Total from '../components/Total'

const Course = ({courses}) => {
  return (
    <div>
      {courses.map(course => 
        [<div key={course.id}>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>]
      )}
    </div>
  )
}

export default Course