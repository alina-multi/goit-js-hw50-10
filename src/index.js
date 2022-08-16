import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

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

    if (!countryName) { 
        return;

    } 

     else if (countryCard.textContent) { 
        return;
    }

     fetchCountries(event,countryName);
    
};
       

function fetchCountries(e,countryName) { 

  
    
      fetch(`https://restcountries.com/v2/name/${countryName}?fields=name,capital,population,flags,languages`)
          .then((response) => {
             
              if (!response.ok) throw "Oops, there is no country with that name"
              return response.json()
          })
          .then((data) => (createContent(data))).catch((err)=> (Notiflix.Notify.failure(`${err}`)))
} 


function createContent(counrties) {
    
    if (counrties.length > 10) {
        notifInfo();
        return;
    }

    else if (counrties.length > 2 && counrties.length < 10) {
        createCountriesList(counrties);
        countryCard.textContent = "";
       
    }

    else if (counrties.length < 2) {
        countryList.textContent = "";
        createCountryCard(counrties);
    }
   
};




function createCountriesList(counrties) {
        const list = counrties.map((country) => {
        return `<li class="preview-list">
         <img src="${country.flags.svg}" alt="" width= "25px" />
        ${country.name}</li>`;
        
        }).join("");
    countryList.insertAdjacentHTML("afterbegin", list);
    
};


function createCountryCard(country) { 
    
    const lang = country[0].languages.map(lang =>  lang.name);
        
        const card = `
        <h2><img src="${country[0].flags.svg}" alt="" width= "30px" />
        ${country[0].name}</h2>
        <p><b>Capital:</b> ${country[0].capital}</p>
        <p><b>Population:</b> ${country[0].population}</p>
        <p><b>Languages:</b> ${lang}</p>
        `
    countryCard.insertAdjacentHTML("afterbegin", card);
    
};


function notifInfo() { 
   return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
   
  
};





 









        


   
