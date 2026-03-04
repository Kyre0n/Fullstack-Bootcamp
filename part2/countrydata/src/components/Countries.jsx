const Countries = ({ countries = [], selectedCountry = '', showCountry }) => {
    const query = selectedCountry.toLowerCase()
    const result = countries.filter(country =>
            country.name.common.toLowerCase().includes(query)
        )
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