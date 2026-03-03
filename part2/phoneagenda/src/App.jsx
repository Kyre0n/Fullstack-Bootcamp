import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    error: false
  })

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const personFound = persons.find(person => person.name === newName)
    if(!personFound) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification({ message: `${returnedPerson.name} added successfully`, error: false })
          setTimeout(() => {
            setNotification({ message: null, error: false })
          }, 5000)
      })
      setNewName('')
      setNewNumber('')
      
    } else {
      if(!window.confirm(`${personFound.name} is already added to phonebook, replace the old number with a new one?`)) return
      personService
        .update(personFound.id,personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
        setNotification({ message: `${personFound.name}'s number changed successfully`, error: false })
        setTimeout(() => {
          setNotification({ message: null, error: false })
        }, 5000)
        })
        .catch(() => {
          setNotification({ message: `Information of '${personFound.name}' has already been removed from server`, error: true })
          setPersons(persons.filter(person => person.id !== personFound.id))
          setTimeout(() => {
            setNotification({ message: null, error: false })
          }, 5000)
        })
    }
  }

  const removePerson = (deletedPerson) => {
    if (!window.confirm(`Are you sure you want to remove ${deletedPerson.name}?`)) return
    personService
      .deletePerson(deletedPerson.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== deletedPerson.id))
        setNotification({ message: `${deletedPerson.name} removed successfully`, error: false })
        setTimeout(() => {
          setNotification({ message: null, error: false })
        }, 5000)
      })
      .catch(() => {
        setNotification({ message: `Information of '${deletedPerson.name}' has already been removed from server`, error: true })
        setPersons(persons.filter(person => person.id !== deletedPerson.id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} removePerson={removePerson} />
    </div>
  )
}

export default App