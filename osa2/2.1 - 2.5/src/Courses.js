const Part = ({part}) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Parts = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <>
        {parts.map(part =>
            <Part key={part.id} part={part} />
        )}
        <b>total of {total} exercises</b>
        </>
    )
}

const Course = ({course}) => {
    return (
        <>
        <h1>{course.name}</h1>
        <Parts parts={course.parts} />
        </>
    )
}

const Courses = ({courses}) => {
    return (
        <>
        {courses.map(course =>
            <Course key={course.id} course={course} />
        )}
        </>
    )
}

export default Courses