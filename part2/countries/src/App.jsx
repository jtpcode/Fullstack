import { useState, useEffect } from 'react'
import countryService from './services/countryInfo'

import Countries from './services/countries'

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


function App() {
  const [countries, setCountries] = useState([])
  const [find, setFind] = useState('')
  const [filtered, setFiltered] = useState([])
  const [weather, setWeather] = useState(null)

  const API_key = import.meta.env.VITE_WEATHER_KEY

  useEffect( () => {
    countryService
      .getAll()
      .then(allCountries => setCountries(allCountries))
  }, [])

  useEffect( () => {
    const foundCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(find.toLowerCase())
    )
    setFiltered(foundCountries)

    // If only one country found, fetch capital weather
    if (foundCountries.length === 1) {
      const latlng = foundCountries[0].capitalInfo.latlng
      countryService
        .getCapitalWeather(latlng[0], latlng[1], API_key)
        .then(weather => setWeather(weather))
    }
  }, [find])

  const handleFindChange = event => setFind(event.target.value)

  return (
    <div>
      <h2>Country search</h2>
      <Find
        find={find}
        handleFindChange={handleFindChange}
      />
      <Countries
        filtered={filtered}
        setFind={setFind}
        weather={weather}
      />
    </div>
  )
}

export default App
