const saliesPavadinimas = document.getElementById("pavadinimas");
const ieskotiPavadinimo = document.getElementById("ieskotiPav");
const btnSearch = document.getElementById("ieskoti");
const saliesPopuliacija = document.getElementById("populiacija");
const saliesPlotas = document.getElementById("plotas");
const saliesValiuta = document.getElementById("valiuta");
const saliestKalba = document.getElementById("kalba");
const saliesVeliava = document.getElementById("veliava");
const saliesHerbas = document.getElementById("herbas");
const salysKaimynes = document.getElementById("kaimynes");
const loading = document.getElementById("loading");
const pranesimas = document.getElementById("pranesimas");

pranesimas.style.display = 'none';


fetch(`https://restcountries.com/v3.1/all?fields=name`)
    .then((response) => {
        loading.style.display = "block";
        return response.json();
    })
    .then((data) => {
        console.log(data);
        data.forEach((country) => {
            const option = document.createElement("option");
            option.textContent = country.name.common;
            option.value = country.name.common;
            ieskotiPavadinimo.appendChild(option);
        });
        loading.style.display = "none";

    });

function clearCountryInfo() {
    saliesPavadinimas.innerHTML = '';
    saliesPopuliacija.innerHTML = '';
    saliesPlotas.innerHTML = '';
    saliesValiuta.innerHTML = '';
    saliestKalba.innerHTML = '';
    saliesVeliava.innerHTML = '';
    saliesHerbas.innerHTML = '';
    salysKaimynes.innerHTML = '';
}

function searchCountries() {
    const name = ieskotiPavadinimo.value;
    loading.style.display = "block";
    fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("Valstybe", data);
            data.forEach((country) => {
                const pavadinimas = document.createElement("div");
                pavadinimas.textContent = country.name.common;
                saliesPavadinimas.appendChild(pavadinimas);

                const populiacija = document.createElement("div");
                populiacija.textContent = `${country.population}`;
                saliesPopuliacija.appendChild(populiacija);

                const plotas = document.createElement("div");
                plotas.textContent = `${country.area}`;
                saliesPlotas.appendChild(plotas);

                const valiuta = document.createElement("div");
                valiuta.textContent = `${country.currencies[Object.keys(country.currencies)[0]].name}`;
                saliesValiuta.appendChild(valiuta);

                const kalba = document.createElement("div");
                kalba.textContent = `${country.languages[Object.keys(country.languages)[0]]}`;
                saliestKalba.appendChild(kalba);

                const veliava = document.createElement("img");
                veliava.src = country.flags.png;
                veliava.classList.add("flag");
                saliesVeliava.appendChild(veliava);

                const herbas = document.createElement("img");
                herbas.src = country.coatOfArms.png;
                herbas.classList.add("coat-of-arms");
                saliesHerbas.appendChild(herbas);
            });
            loading.style.display = "none";
        })
        .catch((error) => {
            console.log(typeof error);
            console.log(`Klaida: ${error}`);
            loading.style.display = "none";
            if (error.name == "TypeError") {
                pranesimas.innerHTML = `Klaida, serveris neveikia arba nėra interneto`;
            }
            pranesimas.style.display = 'block';
        });

}

const surastiSaliPagalPavadinima1 = () => {
    const name = ieskotiPavadinimo.value;
    loading.style.display = "block";
    fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("Valstybe");
            return fetch(`https://restcountries.com/v3.1/alpha?codes=${data[0].borders.join(',')}`)
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            data.forEach((c) => {
                const kaimyneDiv = document.createElement("div");
                kaimyneDiv.textContent = `${c.name.common}:  (${c.population})`;
                salysKaimynes.appendChild(kaimyneDiv);
            })
                .then((response) => {
                    return response.json("Nera kaimynu")
                })
            loading.style.display = "none";
        })
}

btnSearch.addEventListener("click", () => {
    clearCountryInfo();
    searchCountries();
    surastiSaliPagalPavadinima1();
});
