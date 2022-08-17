export function fetchCountries(countryName) { 

     return fetch(`https://restcountries.com/v2/name/${countryName}?fields=name,capital,population,flags,languages`)
          .then((response) => {             
              if (!response.ok) throw "Oops, there is no country with that name"
              return response.json();
          })
          
}