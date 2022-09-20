import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Anecdote = ({anecdote, votes}) => {
  return (
    <>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
    </>
  )
}

const MostVotedAnecdote = ({anecdotes, votes}) => {
  let mostVotes = 0
  let mostVotesIndex = 0

  for (let i = 0; i < anecdotes.length; i++) {
    if (mostVotes < votes[i]) {
      mostVotesIndex = i
      mostVotes = votes[i]
    }
  }

  return (
    <>
      <Anecdote anecdote={anecdotes[mostVotesIndex]} votes={votes[mostVotesIndex]} />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)

  const selectRandom = () => {
    let random = Math.floor(Math.random() * anecdotes.length)

    // if random is the same as selected, reroll
    if (random === selected) {
      for (let i = 0; random === selected; i++) {
        random = Math.floor(Math.random() * anecdotes.length)
      }
    }
    // when random is different, set selection
    setSelected(random)
  }

  const vote = (anecdote) => {
    console.log('voted for', anecdote)
    const votesCopy = {...votes}
    votesCopy[anecdote] += 1
    setVotes(votesCopy)
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />

      <Button handleClick={() => vote(selected)} text="vote" />
      <Button handleClick={() => selectRandom()} text="new anecdote" />

      <h1>Anecdote with most votes</h1>
      <MostVotedAnecdote anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App