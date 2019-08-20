import React, { useState } from 'react';
import ReactDOM from 'react-dom';

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

  const customAverage = () => {
    let y = good + neutral + bad
    let i = good + 0 + -bad 
    return i / y || 0
  }

  const positive = (num, amout) => num / amout * 100 || 0

  const sum = (arr) => arr.reduce((a, b) => a + b, 0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>Good</button>
      <button onClick={handleNeutral}>Neutral</button>
      <button onClick={handleBad}>Bad</button>

      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {sum([good, bad, neutral])}</p>
      <p>avarage {customAverage()}</p>
      <p>positive {positive(good, good + neutral + bad)}%</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)