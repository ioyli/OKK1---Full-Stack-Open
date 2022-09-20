import { useState } from 'react'

const Filter = ({value, handleChange}) => ( <div>filter: <input value={value} onChange={handleChange} /></div> )

const Form = ({onSubmit, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>name: <input value={newName} onChange={handleNameChange} /></div>
      <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Numbers = ({filter}) => {
  return (
    <ul>
      {filter.map(person =>
        <li key={person.key}>{person.name} {person.number}</li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040 123 4567',
      key: 1 },
    { name: 'Eda Lovelace',
      number: '+33 5 66431010',
      key: 2 },
    { name: 'Daniel Abramov',
      number: '045 690 4200',
      key: 3 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('Button clicked', event.target)

    if (newName === '' || newNumber === '') {
      alert('Number and name are required fields')
      
    } else {
      if (persons.find(checkName)) {
        alert(`${newName} is already on the phonebook`)
      } else {
        const newPerson = {
          name: newName,
          number: newNumber,
          key: persons.length + 1
        }
    
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      }
    }
  }

  const checkName = (person) => {
    return person.name === newName
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  const filterNumbers = filter === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filter} handleChange={handleFilterChange} />

      <h2>Add new entry</h2>
      <Form onSubmit={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Numbers filter={filterNumbers} />
    </div>
  )

}

export default App