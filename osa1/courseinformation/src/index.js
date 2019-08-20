import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => <h1>{course.name}</h1>

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

const Part = ({name, exercises}) => {
  return (
    <div>
      <span> {name} </span>
      <span> {exercises} </span>
    </div>
  )
}

const Total = ({parts}) => {
  var sum = 0;
  parts.map(part => sum += part.exercises)
  return (
    <div>
      <p>
        Kaikki kurssit {sum}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))