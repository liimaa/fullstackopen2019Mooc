import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListContry = ({country, weather, show, images}) => {
  const [toggle, setToggle] = useState(false)

  var flagsElem;
  if(images !== null) {
    flagsElem = <img src={country.flag} width={100} height={'auto'} alt={"flag"} />
  }

  const handleShow = () => setToggle(!toggle)

  const listContryValues = () => {
    try {
      let languages = country.languages.map(country => <li key={country.name}> {country.name} </li>)
      return(
        <div>
          <p>{country.name}</p>
          <p>capital {country.capital} </p>
          <p>population {country.population} </p>
  
          <h3>languages </h3>
          <ul>{languages} </ul>
          {flagsElem}
          <button onClick={handleShow}>hide</button>
        </div>
      )
    } catch (error) {
      //console.log("country error", error);
    }
  }

  const listWeatherValues = () => {
    try {
      return(
        <div>
          <p> Weather in {weather.location.name} </p>
          <p> Temperature {weather.current.temp_c} Celsius </p>
          <img src={weather.current.condition.icon} width={100} height={'auto'} alt={"weather ico"} />
          <p> wind {weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
        </div>
      )
    } catch (error) {
      //console.log("weather error", error);
    }
  }

  if(show) {
    return(
      <div>
        {listContryValues()}
        {listWeatherValues()}
      </div>
    )
  }

  if(toggle) {
    return(
      listContryValues()
    )
  }

  return(
    <p>
      {country.name}
      <button onClick={handleShow}>show</button>
    </p>
  )

}


const App = () => {

  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])
  const [searchCountry, setCountry] = useState('finland')

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all")
    .then(response => setCountries(response.data))
  }, [])

  useEffect(() => {
    axios.get(`https://api.apixu.com/v1/current.json?key=${"f9f5e69117484ab08d1155534190206"}&q=${'finland'}`)
    .then(response => setWeather(response.data))
  }, [])


  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  const searchCountries = () => {
    return countries.filter(country => {
      return country.name.toLowerCase().includes(searchCountry)
    })
  }

  return(
    <div>
      find countries <input onChange={handleCountryChange} value={searchCountry} />
      {
        searchCountries().length > 10 
        ? <p>Too many matches</p> 
        : searchCountries().length === 1 
        ? searchCountries().map(country => 
          <ListContry key={country.name} country={country} weather={weather} show={true} />)
        : searchCountries().map(country => 
          <ListContry key={country.name}  country={country} images={null} />)
      }

    </div>
  )
}

export default App
