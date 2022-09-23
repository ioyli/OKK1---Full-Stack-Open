import { useEffect, useState } from 'react'
import personService from './services/persons'

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='notification'>
      <span className={`${message[1]}`}>{message[0]}</span>
    </div>
  )
}

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
  const [notification, setNotification] = useState(null)


  const hook = () => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }
  useEffect(hook, [])
  
  const notify = (message, status) => {
    setNotification([message, status])
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addName = (event) => {
    event.preventDefault()

    if (newName === '' || newNumber === '') {
      notify('Number and name are required fields.', 'error')
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      const personExists = persons.find(checkName)

      if (personExists) {
        if (newPerson.number === personExists.number) {
          notify(`${personExists.name} is already on the phonebook.`, 'error')

        } else {
          if (window.confirm(`${newName} is already on the phonebook, replace the old number with a new one?`)) {
            personService
            .update(personExists.id, newPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== personExists.id ? person : returnedPerson))
            })
            .catch(error => {
              notify(`${newName} does not exist.`, 'error')
            })
            notify(`Number of ${newName} has been updated.`, 'success')
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
        notify(`${newName} has been added to the phonebook.`, 'success')
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
      personService
      .deleteEntry(person.id)
      .catch(error => {
        notify(`${person.name} does not exist.`, 'error')
      })
      .then(setPersons(persons.filter(p => p.id !== person.id)))
      notify(`${person.name} has been deleted from the phonebook.`, 'success')
      
    } else {
      console.log(person.name, 'deletion canceled')
    }
  }

  const filterNumbers = filter === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
    <Notification message={notification} />

    <div className='section'>
      <h2>Phonebook</h2>
      <Filter value={filter} handleChange={handleFilterChange} />
    </div>

    <div className='section'>
      <h2>Add new entry</h2>
      <Form onSubmit={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
    </div>

    <div className='section'>
      <h2>Numbers</h2>
      <Numbers filter={filterNumbers} handler={handlePersonDelete} />
    </div>
    </>
  )

}

export default App