import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      Filter shown numbers with:
      <input
        value={newFilter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name:
        <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        Number:
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, newFilter, deletePerson }) => {
  const filtered_persons = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
      {filtered_persons.map(person =>
        <Person
          key={person.name}
          person={person}
          deletePerson={(event) => deletePerson(event, person)} />
      )}
    </div>
  )
}

const Person = ({ person, deletePerson }) => {
  return (
    <p>
      {person.name}: {person.number} <button onClick={deletePerson}>Poista</button>
    </p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setNewFilter(event.target.value)

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    const successStyle = {
      color: 'green',
      backGround: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    const errorStyle = {
      color: 'red',
      backGround: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }

    const style = message.type === 'success' ? successStyle : errorStyle

    return (
      <div style={style}>
        {message.text}
      </div>
    )
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const personExists = persons.some(person => person.name === newName)

    if (personExists) {
      const person = persons.find(p => p.name === newName)
      if (window.confirm(`Name ${newName} already exists. Replace number?`)) {
        personService
          .replace(person, newNumber)
          .then(changedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : changedPerson))
            setMessage(
              { text: `Information of ${person.name} was updated succesfully.`, type: 'success' }
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(() => {
            setMessage(
              { text: `Information of ${person.name} has already been removed.`, type: 'error' }
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
          })
      }
    }
    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(
            { text: `${newName} was added succesfully.`, type: 'success' }
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(
            { text: `${error.response.data.error}`, type: 'error' }
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (event, person) => {
    event.preventDefault()

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deleteObject(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setMessage(
            { text: `${person.name} was deleted succesfully.`, type: 'success' }
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(() => {
          setMessage(
            { text: `Information of ${person.name} has already been removed.`, type: 'error' }
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />

      <h3>Add a new person</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        newFilter={newFilter}
        deletePerson={deletePerson}
      />
    </div>

  )
}

export default App