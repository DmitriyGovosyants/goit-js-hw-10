export function fetchCountries(name) {
    const BASE_URL = 'https://restcountries.com/v3.1/';
    const OPTION = '?fields=name,capital,population,flags,languages'

    return fetch(`${BASE_URL}name/${name}${OPTION}`)
        .then(resolve => resolve.json())
}

