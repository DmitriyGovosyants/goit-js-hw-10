import { getRefs } from "./getRefs";
const refs = getRefs();

function renderOneCountry(data) {
    const oneCountryMarkup = data
        .map(({ flags, name, capital, population, languages }) => {
            const populationSpaceSeparated = population.toLocaleString();
            const languagesList = Object.values(languages).join(', ');
            return `
            <div class="country-list__item">
                <img src="${flags.svg}" width="100">
                <h1>${name.official}</h1>
            </div>
            <ul>
                <li><b>Capital:</b>${capital}</li>
                <li><b>Population:</b>${populationSpaceSeparated}</li>
                <li><b>Languages:</b>${languagesList}</li>
            </ul>
            `
        })
    refs.countryInfo.innerHTML = oneCountryMarkup;
}

function renderCountriesList(data) {
    const countriesListMarkup = data
        .map(({flags, name}) => `
            <li class="country-list__item">
                <img src="${flags.svg}" width="40">
                <p>${name.official}</p>
            </li>
        `)  
        .join('');
    refs.countryList.innerHTML = countriesListMarkup;
}

export { renderOneCountry, renderCountriesList };