import { useState } from 'react'

const Phonebook = ({ newName, handleNameChange, addName }) => {
  return(
    <form onSubmit={addName}>
      <div>
        name: <input 
                value={newName}
                onChange={handleNameChange}
              />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person => 
        <Person key={person.name} person={person} />
      )}
    </div>
  )
}

const Person = ({ person }) => <p>{person.name}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Phonebook
        newName={newName}
        handleNameChange={handleNameChange}
        addName={addName}
      />

      {/* <Filter ... />

      <h3>Add a new</h3>

      <PersonForm 
        ...
      /> */}

      <h3>Numbers</h3>
      <Persons persons={persons}/>
    </div>
    
  )
  // return (
  //   <div>
  //     <h2>Phonebook</h2>
  //     <form>
  //       <div>
  //         name: <input />
  //       </div>
  //       <div>
  //         <button type="submit">add</button>
  //       </div>
  //     </form>
  //     <h2>Numbers</h2>
  //     ...
  //   </div>
  // )

}

export default App