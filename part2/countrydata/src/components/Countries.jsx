import { useState, useEffect } from 'react'
import countryService from '../services/countryService'

const Countries = ({ countries = [], selectedCountry = '', showCountry }) => {
    const [weather, setWeather] = useState(null)
    
    const query = selectedCountry.toLowerCase()
    const result = countries.filter(country =>
            country.name.common.toLowerCase().includes(query)
        )

    useEffect(() => {
        if (result.length === 1) {
            countryService
                .getWeather(result[0].capital[0])
                .then(returnedWeather => {
                    setWeather(returnedWeather)
                })
        } else {
            setWeather(null)
        }
    }, [selectedCountry, result])

    if (result.length > 10) {
        return (
            <div><p>Too many matches, specify another filter</p></div>
        )
    }

    if (result.length === 1) {
        return (
            <div>
                <h2>{result[0].name.common}</h2>
                <p>Capital: {result[0].capital.map(capital => `${capital} `)}</p>
                <p>Area: {result[0].area}</p>
                <h2>Languages</h2>
                <ul>
                {Object.values(result[0].languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={result[0].flags.png} alt={`Flag of ${result[0].name.common}`} />
                <h2>Weather in {result[0].capital[0]}</h2>
                {weather && <p>Temperature {weather.current.temp_c}ºC</p>}
                {weather && <img src={weather.current.condition.icon} alt={weather.current.condition.text} />}
                {weather && <p>Wind {weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>}
                
                
            </div>
        )
    }

    return (
        <div>
            {result.map(country => (
                <p key={country.cca3}>{country.name.common} <button onClick={() => showCountry(country.name.common)}>Show</button></p>
            ))}
        </div>
    )
}

export default Countries