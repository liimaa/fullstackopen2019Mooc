import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListContry = (country) => {
  try {
    return(
      <div>
        <p>{country.name}</p>
      </div>
    )
  } catch (error) {
    console.log("list error", error);
  }
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [searchCountry, setCountry] = useState('')

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
        :
        searchCountries().map(country => 
          <ListContry key={country.name} {...country} />
        )
      }

    </div>
  )
}

export default App
