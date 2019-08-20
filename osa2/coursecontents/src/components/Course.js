import React from 'react'
import Header from '../components/Header'
import Content from '../components/Content'

const Course = ({course}) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
    </>
  )
}

export default Course