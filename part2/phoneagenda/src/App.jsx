import { useState, useEffect } from 'react'
import Filter from './contents/Filter'
import PersonForm from './contents/PersonForm'
import Persons from './contents/Persons'
import personService from './services/personService'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
      setNewName('')
      setNewNumber('')
    } else {
      if(!window.confirm(`${personFound.name} is already added to phonebook, replace the old number with a new one?`)) return
      personService
        .update(personFound.id,personObject)
        .then(returnedPerson => setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson)))
    }
  }

  const removePerson = (deletedPerson) => {
    if (!window.confirm(`Are you sure you want to remove ${deletedPerson.name}?`)) return
    personService
      .deletePerson(deletedPerson.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== deletedPerson.id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} removePerson={removePerson} />
    </div>
  )
}

export default App