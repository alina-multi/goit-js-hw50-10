import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from "./fetch";

const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryCard = document.querySelector(".country-info");
const DEBOUNCE_DELAY = 300;

input.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
    let countryName = event.target.value.trim();
     if (!countryName) { 
        countryList.textContent = "";
        countryCard.textContent = "";
    };

    fetchCountries(countryName).then((countries) => { createContent(countries)}
  ).catch((err)=> (Notiflix.Notify.failure(`${err}`)));   
};

function createContent(countries) {  
    if (countries.length > 10) {
        notifInfo();
        return;
    }
    else if (countries.length > 2 && countries.length < 10) {
    countryCard.textContent = "";
        const content = countries.reduce((acc, country) => acc + createCountriesList(country), "");
        countryList.insertAdjacentHTML("beforeend", content);
    }

    else if (countries.length < 2 && !countryCard.textContent) {
        countryList.textContent = "";
        const content = countries.reduce((acc, country) => acc + createCountryCard(country), "");
        countryCard.insertAdjacentHTML("beforeend", content);
    };
};

function notifInfo() { 
   return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  
};
    
function createCountryCard(country) { 
  
     return `<h2><img src="${country.flags.svg}" alt="" width= "30px" />
        ${country.name}</h2>
        <p><b>Capital:</b> ${country.capital}</p>
        <p><b>Population:</b> ${country.population}</p>
        <p><b>Languages:</b> </p>
        `;
    
};
    
 function createCountriesList(country) {       
        return `<li class="preview-list">
         <img src="${country.flags.svg}" alt="" width= "25px" />${country.name}</li>`;
};