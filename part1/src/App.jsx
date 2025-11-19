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

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Display = ({counter}) => <div>{counter}</div>

const Button = ({ onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)

  const [clicks, setClicks] = useState({
    left: 0, right: 0       //Dejo esta forma en vez de usar dos useState distintos para practicar el uso de objetos en el state pero no es lo más recomendable según el bootcamp ya que dice que "no hay ningún beneficio aparente y la aplicación resultante es mucho más compleja."
  })

   const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    const newClicks = {
      ...clicks,
      left: clicks.left + 1,
    }
    setClicks(newClicks)
    setAll(allClicks.concat('L'))
  }

  const handleRightClick = () => {
    const newClicks = {
      ...clicks,
      right: clicks.right + 1
    }
    setClicks(newClicks)
        setAll(allClicks.concat('R'))
  }

  const createHandleClick = ({value}) => {
    if (value === 1) {
      const handleIncrement = () => {
        console.log('incrementing, value before', counter)
        setCounter(counter + value)
      }
      return handleIncrement
    } else if (value === -1) {
      const handleDecrement = () => {
        console.log('decrementing, value before', counter)
        setCounter(counter + value)
      }
      return handleDecrement
    } else {
        const handleReset = () => {
        console.log('resetting to zero, value before', counter)
        setCounter(0)
      }
      return handleReset
    }
  }



  /*
  setTimeout(             // No se debe poner un setTimeout ni setInterval aquí porque se ejecuta en cada renderizado y hace que de problemas.
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
        onClick={ createHandleClick({value: 1}) }
        text='plus'
      />
      <Button
        onClick={ createHandleClick({value: 0}) }
        text='zero'
      />
      <Button
        onClick={ createHandleClick({value: -1}) }
        text='minus'
      />
      <p/>
      {clicks.left}
      <Button
        onClick={handleLeftClick}
        text="Left"
      />
      <Button
        onClick={handleRightClick}
        text="Right"
      />
      {clicks.right}
      <History allClicks={allClicks} />
    </div>
  )
}

export default App
                                  