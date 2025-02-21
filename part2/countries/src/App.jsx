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

const Countries = ({ filtered, setFind, weather }) => {
  const count = filtered.length

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
        {filtered.map(country =>
          <Country
            key={country.name.common}
            country={country}
            setFind={setFind}
          />
        )}
      </div>
    )
  }
  else if (count === 1 ) {
    // If only one country, show details 
    return countryDetails(filtered[0], weather)
  }

  return null
}

const Country = ({ country, setFind }) => {
  const countryName = country.name.common
  return (
    <>
      {countryName + ' '}
      <button onClick={(event) => {
        event.preventDefault()
        setFind(countryName)
      }}>
        Show
      </button>
      <br />
    </>
  )
}

const countryDetails = (country, weather) => {
  if (weather) {
    const weatherUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

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
        <h1>
          Weather in {country.name.common}
        </h1>
        Temperature {weather.main.temp} Celsius
        <br />
        <img src={weatherUrl} />
        <br />
        Wind {weather.wind.speed} m/s
      </div>
    )
  }
  
  return null
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
