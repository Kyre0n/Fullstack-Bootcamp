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



const App = () => {
  return(
    <div>
      <h1>Greetings!</h1>
      <Hello name='George'/>
      <Hello name='Samuel'/>
      <Hello name='David'/>
      <Edad name='George' age={26 + 10}/>
    </div>
  )
}

export default App
                                  