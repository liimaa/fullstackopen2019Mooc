import React from 'react'
import ReactDOM from 'react-dom'


const Header = ({course}) => <h1>{course}</h1>


const Content = (parts) => {
  
  console.log(parts);

  return (
    <div>
      <Part {...parts} />
      <Part {...parts} />
      <Part {...parts} />
    </div>
  )
}

const Part = () => {
  return null
}

const Total = ({parts}) => {
  return (
    null
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  
  return (
      <div>
        <Header course={course} />
        <Content />
        <Total  />
      </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))