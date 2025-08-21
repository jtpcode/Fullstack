const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  interface HeaderProps {
    name: string;
  }

  const Header = ({ name }: HeaderProps) => <h1>{name}</h1>;

  interface ContentProps {
    parts: { name: string; exerciseCount: number }[];
  }

  const Content = ({ parts }: ContentProps) => (
    <div>
      {parts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );

  interface TotalProps {
    total: number;
  }

  const Total = ({ total }: TotalProps) => {
    return <p>Number of exercises {total}</p>;
  };

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;