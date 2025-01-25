import { useState } from 'react'

const Header = ({ header }) => <h1>{header}</h1>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Line = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Header-text
  const header1 = 'Unicafe Feedback System'
  const header2 = 'Statistics'

  // Event handlers
  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header={header1} />
      <Button onClick={handleGoodClick} text='Good'/>
      <Button onClick={handleNeutralClick} text='Neutral'/>
      <Button onClick={handleBadClick} text='Bad'/>
      <Header header={header2} />
      <Line text='Good' value={good} />
      <Line text='Neutral' value={neutral} />
      <Line text='Bad' value={bad} />
    </div>
  )
}

export default App