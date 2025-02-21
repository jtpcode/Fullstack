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
    return CountryDetails(filtered[0], weather)
  }

  return (
    <div>
      <br />
      No matches
    </div>
  )
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

const CountryDetails = (country, weather) => {
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

export default Countries