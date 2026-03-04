import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY                   //API de www.weatherapi.com
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const apiWeather = `http://api.weatherapi.com/v1/current.json?key=${api_key}`

const getAll = () => {
    const request = axios.get(`${baseUrl}/api/all`)
    return request.then(response => response.data)
}

const getWeather = capital => {
    const request = axios.get(`${apiWeather} &q=${capital}&aqi=no`)
    return request.then(response => response.data)
}

export default { getAll, getWeather }