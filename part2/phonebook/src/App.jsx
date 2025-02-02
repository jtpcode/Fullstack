import { useState } from 'react'

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

const Persons = ({ persons, newFilter }) => {
  const filtered_persons = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
      {filtered_persons.map(person => 
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

const Person = ({ person }) => <p>{person.name}: {person.number}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const personExists = persons.some(person => person.name === newName)

    {personExists ? alert(`Name ${newName} already exists.`) : setPersons(persons.concat(personObject))}
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter}
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
      <Persons persons={persons} newFilter={newFilter}/>
    </div>
    
  )
}

export default App