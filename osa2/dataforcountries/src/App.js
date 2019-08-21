import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListContry = (country) => {

  const [toggle, setToggle] = useState(false)

  var f = null;
  if(country.images !== null) {
    f = <img src={country.flag} width={100} height={'auto'} alt={"flag"} />
  }

  const handleShow = () => setToggle(!toggle)

  console.log(toggle);

  if(toggle) {
    try {
      let languages = country.languages.map(country => <li key={country.name}> {country.name} </li>)
        return(
          <div>
            <p>{country.name}</p>
            <p>capital {country.capital} </p>
            <p>population {country.population} </p>
    
            <h3>languages </h3>
            <ul>{languages} </ul>
            {f}
            <button onClick={handleShow}>hide</button>
          </div>
        )
      } catch (error) {
        console.log("list error", error);
      }
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
  const [searchCountry, setCountry] = useState('sw')

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all")
      .then(response => setCountries(response.data))
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
          <ListContry key={country.name} {...country} />)
        : searchCountries().map(country => 
          <ListContry key={country.name} {...country} images={null} />)
      }
    </div>
  )
}

export default App
