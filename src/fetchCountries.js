const BASE_URL = 'https://restcountries.com/v3.1/';
const option = '?fields=name,capital,population,flags,languages';
    
export function fetchCountries(name) {
    return fetch(`${BASE_URL}name/${name}${option}`)
        .then(resolve => resolve.json())
}