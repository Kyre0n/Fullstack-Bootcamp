const Header = ({course}) => <h1>{course}</h1>

const Content = ({parts}) => {
  return (
    <>
      <p>
      {parts[0].name} {parts[0].exercises}
      </p>
      <p>
      {parts[1].name} {parts[1].exercises}
      </p>
      <p>
      {parts[2].name} {parts[2].exercises}
      </p>
    </>
  )
}

const Total = ({total}) => <p>Number of exercises {total}</p>

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  /*
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  */

  return (
    <div>
      <Header course= {course} />
      <Content parts={parts} />
      <Total total={parts[0].exercises + parts[1].exercises + parts[2].exercises} />
    </div>
  )
}

export default App
