import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const Authors = ({ show, authors }) => {
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const selectOptions = authors.map((a) => ({ value: a.name, label: a.name }))

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    awaitRefetchQueries: true
  })

  if (!show) {
    return null
  }

  const setBirth = async (event) => {
    event.preventDefault()

    const name = selectedOption.value

    await editAuthor({ variables: { name, born } })

    setBorn('')
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={setBirth}>
          <div>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={selectOptions}
            />
            Born
            <input
              type="number"
              value={born}
              onChange={({ target }) => setBorn(Number(target.value))}
            />
            <div>
              <button type="submit">Update author</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Authors
