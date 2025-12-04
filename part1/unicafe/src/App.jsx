import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => <div>{text} {value}</div>

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
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={good + neutral + bad}/>
          <StatisticLine text="average" value={good - bad}/>
          <StatisticLine text="positive" value={good / (good + neutral + bad)}/>
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
    <Button onClick={handleGoodClick} text="good"/>
    <Button onClick={handleNeutralClick} text="neutral"/>
    <Button onClick={handleBadClick} text="bad"/>
    <Statistics good={good} neutral= {neutral} bad={bad}/>
  </div>
  )
}
export default App
