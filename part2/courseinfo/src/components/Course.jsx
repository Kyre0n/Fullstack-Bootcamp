const Header = ({courseName}) => <h1>{courseName}</h1>

const Content = ({part}) => <p>{part.name} {part.exercises}</p>

const Total = ({parts}) => parts.reduce((s, p) => {
    s += p.exercises
    console.log('What is happening', s, p.exercises)
    return s
},0)

const Course = ({course}) => {
    return (
        <>
            <Header courseName={course.name} />
            {course.parts.map(part =>
                <Content key={part.id} part={part} />
            )}
            <p>Total number of exercises: <Total parts={course.parts} /></p>
        </>
    )
}

export default Course