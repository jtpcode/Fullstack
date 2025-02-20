import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Find = ( {find, handleFindChange} ) => {
  return (
    <div>
      Find countries:{' '}
      <input
        value={find}
        onChange={handleFindChange}
      />
    </div>
  )
}

const Countries = ({ countries, find }) => {
  const foundCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(find.toLowerCase())
  )

  if (foundCountries.length > 10) {
    return (
      <div>
        <br />
        Over 10 matches, please specify the name in more detail
      </div>
    )
  }

  return (
    <div>
      <br />
      {foundCountries.map(country =>
        <Country
          key={country.name.common}
          country={country}
        />
      )}
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <>
      {country.name.common}
      <br />
    </>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [find, setFind] = useState('')

  useEffect( () => {
    countryService
      .getAll()
      .then(allCountries => setCountries(allCountries))
  }, [])

  const handleFindChange = event => setFind(event.target.value)

  return (
    <div>
      <h2>Country search</h2>
      <Find
        find={find}
        handleFindChange={handleFindChange}
      />
      <Countries countries={countries} find={find} />
    </div>
  )
}

export default App
