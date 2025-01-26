import { useState } from 'react'

const Header = ({ header }) => <h1>{header}</h1>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  if (text === 'Positive') {
    return (
      <div>
        {text} {value} %
      </div>
    )
  }

  return (
    <div>
      {text} {value}
    </div>
  )
}

const Statistics = ({ stats }) => {
  const good = 1
  const neutral = 0
  const bad = -1
  const all = stats[0] + stats[1] + stats[2]
  const average = (stats[0]*good + stats[1]*neutral + stats[2]*bad) / all
  const positive = (stats[0] / all) * 100

  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <StatisticLine text='Good' value={stats[0]} />
      <StatisticLine text='Neutral' value={stats[1]} />
      <StatisticLine text='Bad' value={stats[2]} />
      <StatisticLine text='All' value={all} />
      <StatisticLine text='Average' value={average} />
      <StatisticLine text='Positive' value={positive} />
    </div>
  )
}

const App = () => {
  // States
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Header text
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
      <Statistics stats={[good, neutral, bad]} />
    </div>
  )
}

export default App