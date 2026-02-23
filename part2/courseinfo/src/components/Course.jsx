const Header = ({courseName}) => <h1>{courseName}</h1>

const Content = ({part}) => <p>{part.name} {part.exercises}</p>

const Course = ({course}) => {
    return (
        <>
            <Header courseName={course.name} />
            {course.parts.map(part =>
                <Content key={part.id} part={part} />
            )}
        </>
    )
}

export default Course