import React from 'react'
import ReactDOM from 'react-dom'


const Header = ({course}) => <h1>{course}</h1>


const Content = (parts) => {
  
  console.log(parts);

  return (
    <Part {...parts} />
    <Part {...parts} />
    <Part {...parts} />
  )
  
}

const Total = ({parts}) => {
  return (
    null
  )
}

const Part = (params) => {
  
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  
  return (
      <div>
        <Header course={course} />
        <Content  />
        <Total  />
      </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))