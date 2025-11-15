const Header = ({course}) => <h1>{course}</h1>

const Content = ({part1, part2, part3}) => {
  return (
    <>
      <p>
      {part1.name} {part1.exercises}
      </p>
      <p>
      {part2.name} {part2.exercises}
      </p>
      <p>
      {part3.name} {part3.exercises}
      </p>
    </>
  )
}

const Total = ({total}) => <p>Number of exercises {total}</p>

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
      <Content part1={part1} part2={part2} part3={part3} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App
