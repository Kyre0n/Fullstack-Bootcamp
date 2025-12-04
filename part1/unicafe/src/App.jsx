import { useState } from 'react'

// un lugar adecuado para definir un componente
const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </>
    )
  } 
  else {
    return (
        <>
          <h1>statistics</h1>
          <div>good {good}</div>
          <div>neutral {neutral}</div>
          <div>bad {bad}</div>
          <div>all {good + neutral + bad}</div>
          <div>average {good - bad}</div>
          <div>positive {good / (good + neutral + bad)}</div>
        </>
    )
  }
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    console.log('good clicked')
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    console.log('neutral clicked')
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    console.log('bad clicked')
    setBad(bad + 1)
  }
  return (
  <div>
    <h1>give feedback</h1>
    <button onClick={handleGoodClick}>good</button>
    <button onClick={handleNeutralClick}>neutral</button>
    <button onClick={handleBadClick}>bad</button>
    <Statistics good={good} neutral= {neutral} bad={bad}/>
  </div>
  )
}
export default App
