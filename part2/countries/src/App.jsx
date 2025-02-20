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
  const count = foundCountries.length

  if (count > 10) {
    return (
      <div>
        <br />
        Over 10 matches, please specify the name in more detail
      </div>
    )
  }
  else if (count > 1) {
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
  else if (count === 1 ) {
    // If only one country, show details
    const country = foundCountries[0]
    return (
      <div>
        <h1>
          {country.name.common}
        </h1>
        Capital: {country.capital[0]}
        <br />
        Area: {country.area}
        <h2>
          Languages
        </h2>
        <ul>
          {Object.entries(country.languages).map(([code, language]) => (
            <li key={code}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} />
      </div>
    )
  }
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
