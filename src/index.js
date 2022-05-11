import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    inputSearch: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}
const DEBOUNCE_DELAY = 300;
const MAX_COUNTRIES_VIEW = 10;

refs.inputSearch.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

function onCountrySearch(e) {
    const currentSearchRequest = e.target.value.trim();
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';

    fetchCountries(currentSearchRequest)
        .then(data => {
            if (data.length > MAX_COUNTRIES_VIEW) {
                return Notify.info('Too many matches found. Please enter a more specific name.');
            }
            if (data.length === 1) {
                return drawOneCountryMarkup(data);
            }
            drawCountriesListMarkup(data);
        })
}

function drawCountriesListMarkup(data) {
    const arr = data
        .map(({flags, name}) => `
            <li class="country-list__item">
                <img src="${flags.svg}" width="40">
                <p>${name.official}</p>
            </li>
        `)  
        .join('');
    refs.countryList.innerHTML = arr;
}

function drawOneCountryMarkup(data) {
    const arr = data
        .map(({flags, name, capital, population, languages}) => `
            <div class="country-list__item">
                <img src="${flags.svg}" width="40">
                <p>${name.official}</p>
            </div>
            <ul>
                <li><b>Capital:</b> ${capital}</li>
                <li><b>Population:</b> ${population}</li>
                <li><b>Languages:</b> ${languages}</li>
            </ul>
        `)  
        .join('');
    refs.countryInfo.innerHTML = arr;
}
