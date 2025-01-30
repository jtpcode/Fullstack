const Course = ({ courses }) => {
    return (
      <div>
        {courses.map(course =>
          <div key={course.id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        )}
      </div> 
    )
  }
  
  const Header = ({ course }) => <h2>{course}</h2>
  
  const Content = ({ parts }) => <Part parts={parts} />
  
  const Part = ({ parts }) => {
    return (
      <div>
        {parts.map(part =>
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        )}
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) =>
      sum + part.exercises, 0
    )
  
    return (
        <p>
          <b>Total of {total} exercises</b>
        </p>
    )
  }

  export default Course