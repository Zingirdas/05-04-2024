
const saliesPavadinimas = document.getElementById("pavadinimas");
const ieskotiPavadinimo = document.getElementById("ieskotiPav");
const btnSearch = document.getElementById("ieskoti");
const saliesPopuliacija = document.getElementById("populiacija");
const saliesPlotas = document.getElementById("plotas");
const saliesValiuta = document.getElementById("valiuta");
const saliestKalba = document.getElementById("kalba");
const saliesVeliava = document.getElementById("veliava");
const saliesHerbas = document.getElementById("herbas");
const salysKaimynes = document.getElementById("kaimynes")


const surastiSaliPagalPavadinima = () => {
    const name = ieskotiPavadinimo.value;
    fetch(`https://restcountries.com/v3.1/name/${name}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);

            saliesPavadinimas.innerHTML = '';
            saliesPopuliacija.innerHTML = '';
            saliesPlotas.innerHTML = '';
            saliesValiuta.innerHTML = '';
            saliestKalba.innerHTML = '';
            saliesVeliava.innerHTML = '';
            saliesHerbas.innerHTML = '';
            salysKaimynes.innerHTML = '';

            data.forEach(country => {

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

                const kaimynes = document.createElement("div");
                kaimynes.textContent = `${country.borders}`;
                salysKaimynes.appendChild(kaimynes);

            });
        })
}

btnSearch.onclick = surastiSaliPagalPavadinima;



