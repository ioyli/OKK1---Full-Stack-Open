import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = `${Math.round(((good / all) * 100) * 100) / 100}%`

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={all} />
      <StatisticsLine text="average" value={average} />
      <StatisticsLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Feedback</h1>
      <div>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )

}

export default App