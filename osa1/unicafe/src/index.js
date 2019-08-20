import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({good, bad, neutral}) => {

  const customAverage = () => {
    let y = good + neutral + bad
    let i = good + 0 + -bad 
    return i / y || 0
  }

  const positive = (num, amout) => num / amout * 100 || 0

  const sum = (arr) => arr.reduce((a, b) => a + b, 0)

  if(!good && !bad && !neutral) {
    return(
      <p>No feedback given</p>
    )
  }

  return(
    <div>
      <table>
        <tbody>
          <Statistic text='good' value={good}/>
          <Statistic text='neutral' value={neutral}/>
          <Statistic text='bad' value={bad}/>
          <Statistic text='all' value={sum([good, bad, neutral])}/>
          <Statistic text='avarage' value={customAverage()}/>
          <Statistic text='positive' value={positive(good, good + neutral + bad) + '%'}/>
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGood = () => {
    setGood(good + 1)
  }
  
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button 
        onClick={handleGood} 
        text='good'
      />
      <Button 
        onClick={handleNeutral} 
        text='Neutral'
      />
      <Button 
        onClick={handleBad} 
        text='bad'
      />

      <h2>Statistics</h2>
      <Statistics 
        good={good}
        bad={bad}
        neutral={neutral}
      />

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)