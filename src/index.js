import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { getRefs } from './getRefs';
import { renderOneCountry, renderCountriesList } from './renderCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = getRefs();
const DEBOUNCE_DELAY = 300;
const MAX_COUNTRIES_VIEW = 10;

refs.inputSearch.addEventListener('input', debounce(onCountrySearch, DEBOUNCE_DELAY));

function onCountrySearch(e) {
    const searchQuery = e.target.value.trim();
    
    clearCountriesMarkup();
    
    if (!searchQuery) {
        return;
    }

    fetchCountries(searchQuery)
        .then(renderCountries)
        .catch(onFetchError)
}

function clearCountriesMarkup() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}

function renderCountries(data) {
    if (data.length > MAX_COUNTRIES_VIEW) {
        return tooManyMatches();
    }
    if (data.length === 1) {
        return renderOneCountry(data);
    }
    renderCountriesList(data);
}

function tooManyMatches() {
    return Notify.info('Too many matches found. Please enter a more specific name.');
}

function onFetchError(error) {
    return Notify.failure('Oops, there is no country with that name');
}