import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => 
    axios
    .get(baseUrl)
    .then(response => response.data)

const getCapitalWeather = (lat, lon, API_key) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`

    return (
        axios
        .get(url)
        .then(response => response.data)
    )
}

const getWeatherIcon = (icon) => {
    const url = `https://openweathermap.org/img/wn/${icon}@2x.png`

    return (
        axios
        .get(url)
        .then(response => response.data)
    )
}

export default { getAll, getCapitalWeather, getWeatherIcon }