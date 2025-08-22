interface DiaryEntryProps {
  entry: {
    date: string
    visibility: string
    weather: string
  }
}
  
const DiaryEntryComponent = ({ entry: { date, visibility, weather } }: DiaryEntryProps) => {
  return (
    <div>
      <p><strong>{date}</strong></p>
      Visibility: {visibility}
      <br />
      Weather: {weather}
    </div>
  )
}

export default DiaryEntryComponent