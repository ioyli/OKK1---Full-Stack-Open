import { useEffect, useState } from "react"
import axios from 'axios'
const key = process.env.REACT_APP_WEATHER_KEY
console.log(key)

const Weather = ({latlng}) => {
  const [weather, setWeather] = useState([])
  
  const weatherHook = () => {
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${key}&units=metric`)
    .then(response => {
      setWeather(response.data)
    })
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(weatherHook, [])

  if (weather.coord === undefined) {
    return (<></>)
  } else {
    return (
      <div>
          <p>temperature: {weather.main.temp} celsius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt='icon' />
          <p>wind: {weather.wind.speed} m/s</p>
      </div>
    )
  }
}

const Languages = ({languages}) => {
  return (
    <ul>
      {languages.map(language =>
        <li key={language}>{language}</li>)}
    </ul>
  )
}

const Country = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      
      <ul>
        <li>capital: {country.capital}</li>
        <li>area: {country.area}</li>
      </ul>

      <h2>languages:</h2>
      <Languages languages={Object.values(country.languages)} />

      <img src={country.flags.png} alt="flag" />

      <h2>Weather in {country.capital}</h2>
      <Weather latlng={country.capitalInfo.latlng} />
    </div>
  )
}

const Countries = ({filter, handler}) => {

  if (filter.length > 10) {
    return ( <p>Too many matches, specify another filter</p> )

  } else if (filter.length === 0) {
    return ( <p>No matches, specify another filter</p>)

  } else if (filter.length === 1) {
    return ( <Country country={filter[0]} /> )

  } else {
    return (
      <ul>
        {filter.map(country =>
          <li key={country.name.common}>{country.name.common} <button value={country.name.common} onClick={handler}>view</button></li>)}
      </ul>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }
  useEffect(hook, [])
  console.log('retrieved', countries.length, 'countries')

  const filterCountries = filter === ''
  ? countries
  : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  const handleFilterChange = (e) => {
    setFilter(e.currentTarget.value)
  }

  return (
    <div>
      find countries <input value={filter} onChange={handleFilterChange} />

      <Countries filter={filterCountries} handler={handleFilterChange} />
    </div>
  )
}

export default App;
