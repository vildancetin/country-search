const searchInput = document.querySelector("#search");
const searchDiv = document.querySelector("#searchDiv");
const countries = document.querySelector(".countries");
const liElements = countries.getElementsByTagName('li');



let getCountryInfo = ()=> {
    fetch("https://restcountries.com/v3.1/all")
    .then(res=>{
        try{
            console.log(res)
            return res.json()
        }catch(err){
            return `Error : ${res.status}`
        }    

    })
    .then(data => {
        // console.log(data)
        showCountry(data)
    })
    .catch(err=>console.log(err))

}

getCountryInfo()
const showCountry = (data) => {
    const nameH5=document.getElementById("name")
    const img=document.querySelector(".card img")
    data.forEach((country) => {
        const filteredKeys = Object.keys(country).filter(key => key==="name" || key ==="region" || key ==="capital" ||key ==="languages" ||key ==="currencies" ||key ==="borders" ||key ==="maps" ||key ==="population" ||key ==="flags" );
        console.log(filteredKeys)
        let {name,flags:{png:imgLink}}=country
        nameH5.textContent=name.official
        // console.log(name.official,population,imgLink)
        img.src=imgLink
        for(let i=0;i<liElements.length;i++){
            if(filteredKeys.includes(liElements[i].id)){
                if(liElements[i].id==="languages"){
                    console.log(Object.values(country[liElements[i].id]))
                    liElements[i].lastChild.textContent=" " +Object.values(country[liElements[i].id])
                    console.log(liElements[i].lastChild.textContent)
                }
                else if(liElements[i].id==="currencies"){
                    console.log(Object.values(Object.values(country[liElements[i].id])[0]))
                    liElements[i].lastChild.textContent=" "+ Object.values(Object.values(country[liElements[i].id])[0])
                    console.log(liElements[i].lastChild.textContent)
                }else{
                    liElements[i].lastChild.textContent=" "+country[liElements[i].id]
                }
                
            }
        }
    });
    
}

