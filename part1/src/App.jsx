import { useState } from 'react'


const Hello = (props) => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a + b)
  return (
      <div>
        <p>Hello {props.name}, it is {now.toString()}</p>
        <p>
          {a} plus {b} is {a + b}
        </p>
      </div>
  )
}
/*
const Edad = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old.</p>
    </div>
  )
}
*/


// Hace lo mismo que el componente comentado arriba pero usando desestructuración
const Edad = ({name, age}) => {
  console.log("Componente desestructurado")
  return (
    <div>
      <p>Hello {name}, you are {age} years old.</p>
    </div>
  )
}

const Display = ({counter}) => <div>{counter}</div>

const Button = ({ onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)

  const increaseByOne= () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }

  const decreaseByOne = () => {
    setCounter(counter - 1)
    console.log('decreasing, value before', counter)
  }

  const setToZero = () => {
    setCounter(0)
    console.log('resetting to zero, value before', counter)
  }

  /*
  setTimeout(
    () => setCounter(counter + 1),
    1000
  )
  */

  console.log('rendering...', counter)

  return(
    <div>
      <h1>Greetings!</h1>
      <Hello name='George'/>
      <Hello name='Samuel'/>
      <Hello name='David'/>
      <Edad name='George' age={26 + 10}/>
      <Display counter={counter}/>
      <Button
        onClick={increaseByOne}
        text='plus'
      />
      <Button
        onClick={setToZero}
        text='zero'
      />
      <Button        
        onClick={decreaseByOne}        
        text='minus'      
      />  
    </div>
  )
}

export default App
                                  