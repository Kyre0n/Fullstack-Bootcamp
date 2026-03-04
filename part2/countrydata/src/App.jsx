import { useState, useEffect } from 'react'
import './App.css'
import countryService from './services/countryService'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')

  

  useEffect(() => {
    countryService
      .getAll()
      .then(countries => setCountries(countries))
  }, [])

  const handleCountryChange = Event => {
    setSelectedCountry(Event.target.value)
  }

  const showCountry = (countryName) => {
    setSelectedCountry(countryName)
  }


  return (
    <div>
      find countries <input value={selectedCountry} onChange={handleCountryChange} />
      <Countries countries={countries} selectedCountry={selectedCountry} showCountry={showCountry} />
    </div>
  )
}

export default App