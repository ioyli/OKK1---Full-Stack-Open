import { useEffect, useState } from 'react'
import personService from './services/persons'

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

const Numbers = ({filter, handler}) => {
  return (
    <ul>
      {filter.map(person =>
        <li key={person.id}>{person.name} {person.number} <button value={person.name} onClick={handler}>delete</button></li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  const hook = () => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }
  useEffect(hook, [])


  const addName = (event) => {
    event.preventDefault()
    console.log('Button clicked', event.target)

    if (newName === '' || newNumber === '') {
      alert('Number and name are required fields')
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      const personExists = persons.find(checkName)

      if (personExists) {
        if (newPerson.number === personExists.number) {
          alert(`${personExists.name} is already on the phonebook.`)

        } else {
          if (window.confirm(`${newName} is already on the phonebook, replace the old number with a new one?`)) {
            console.log(`replace number of ${newName}`)
            
            personService
            .update(personExists.id, newPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== personExists.id ? person : returnedPerson))
            })
          }
        }
      } else {
        personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      }
    }
  }

  const checkName = (person) => {
    return person.name === newName
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  
  const handlePersonDelete = (e) => {
    const person = persons.find(person => person.name === e.currentTarget.value)
    if (window.confirm(`Delete data of ${person.name}?`)) {
      console.log(person.name, 'deleted')
      personService
      .deleteEntry(person.id)
      .then(setPersons(persons.filter(p => p.id !== person.id)))
    } else {
      console.log(person.name, 'deletion canceled')
    }
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
      <Numbers filter={filterNumbers} handler={handlePersonDelete} />
    </div>
  )

}

export default App