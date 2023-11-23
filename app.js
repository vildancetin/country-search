const searchInput = document.querySelector("#search")
const searchDiv = document.querySelector("#searchDiv");
const countries = document.querySelector(".countries");
const liElements = countries.getElementsByTagName("li");
const maps_a_link = document.querySelector("#maps a");

// ? get country info from api



let getCountryInfo = () => {
    const userInput = searchInput.value
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => {
      try {
        // console.log(res)
        return res.json();
      } catch (err) {
        return `Error : ${res.status}`;
      }
    })
    .then((data) => {
      // console.log(data)
        const filtered = data.filter((country) => {
            const countryName=country.name.common.toLowerCase()
            searchDiv.innerText+=countryName
          return countryName.includes(userInput.toLowerCase())
          
      });
      showCountry(filtered);
      updateSimilarCountries(filtered)
      
    })
    .catch((err) => console.log(err));
};
searchInput.addEventListener("input", getCountryInfo)
searchDiv.addEventListener("click",displaySelectedCountry)

function displaySelectedCountry(e) {
    console.log(e.target.value)
    const selectedCountry = e.target.value;
    searchInput.value=selectedCountry
    searchDiv.textContent=""
  }

// ? it shows static country whne page loaded
let getLoadinfCountryInfo = async () => {
  let res = await fetch("https://restcountries.com/v3.1/name/turkey");
  let resJson = await res.json();
  showCountry(resJson);
};
function updateSimilarCountries(filtered){
    searchDiv.innerText= ""

    filtered.forEach(country=>{
        const option =document.createElement("option")
        option.value=country.name.common
        option.textContent=country.name.common
        searchDiv.appendChild(option)
        
    })

}
// ? shows country informations and take parameter that comes from api
const showCountry = (data) => {
  const nameH5 = document.getElementById("name");
  const img = document.querySelector(".card img");
  data.forEach((country) => {
    const filteredKeys = Object.keys(country).filter(
      (key) =>
        key === "name" ||
        key === "region" ||
        key === "capital" ||
        key === "languages" ||
        key === "currencies" ||
        key === "borders" ||
        key === "maps" ||
        key === "population" ||
        key === "flags"
    );

    let {
      name,
      flags: { png: imgLink },
    } = country;
    nameH5.textContent = name.common;

    img.src = imgLink;
    for (let i = 0; i < liElements.length; i++) {
      if (filteredKeys.includes(liElements[i].id)) {
        if (liElements[i].id === "languages") {
          liElements[i].lastChild.textContent =
            " " + Object.values(country[liElements[i].id]);
        } else if (liElements[i].id === "currencies") {
          liElements[i].lastChild.textContent =
            " " + Object.values(Object.values(country[liElements[i].id])[0]);
        } else if (liElements[i].id === "maps") {
          maps_a_link.href = country["maps"]["googleMaps"];
        } else {
          liElements[i].lastChild.textContent = " " + country[liElements[i].id];
        }
      }
    }
  });
};

window.addEventListener("load", () => {
  getLoadinfCountryInfo();
});
