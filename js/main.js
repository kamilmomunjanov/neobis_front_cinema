

const API_KEY = "f636e85f-179e-4dc1-851f-737d2ed75264";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_TOP10 = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=MAY"


getMovies(API_URL_POPULAR);
async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY
        }
    })
    const respData = await resp.json()
    console.log(respData)
    showMovies(respData)
    // topThisMonths(respData)
}


function getClassByRate(vote) {
    if (vote >= 7 || vote >= "70%" || vote === "100.0%") {
        return "green"
    }
    else if(vote >= 5 || vote >= "50%") {
        return "orange"
    }
    else  {
        return "red"
    }
}

function showMovies(data) {
    const moviesEl =document.querySelector(".movies")

    document.querySelector(".movies").innerHTML = "";
    data.films.forEach(el => {
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")
        movieEl.innerHTML = `
        <div class="movie__cover-inner">
                        <img class="movie__cover"
                             src="${el.posterUrlPreview}"
                             alt="${el.nameRu}">
                        <div class="movie__cover--darkened"></div>
                    </div>
                    <div class="movie__info">
                        <div class="movie__title">${el.nameRu}</div>
                        <div class="movie__category">${el.genres.map((genre) => ` ${genre.genre}`)}</div>
                        <div class="movie__average movie__average--${getClassByRate(el.rating)}">${el.rating}</div>
                        <div class="movie__year">${el.year}</div>
                    </div>
        `
        moviesEl.appendChild(movieEl)
    })
}

// function topThisMonths(dataTop) {
//     const moviesEl =document.querySelector(".movies")
//
//     document.querySelector(".movies").innerHTML = "";
//     dataTop.items.forEach(element => {
//         const movieEl = document.createElement("div")
//         movieEl.classList.add("movie")
//         movieEl.innerHTML = `
//         <div class="movie__cover-inner">
//                         <img class="movie__cover"
//                              src="${element.posterUrlPreview}"
//                              alt="${element.nameRu}">
//                         <div class="movie__cover--darkened"></div>
//                     </div>
//                     <div class="movie__info">
//                         <div class="movie__title">${element.nameRu}</div>
//                         <div class="movie__category">${element.genres.map((genre) => ` ${genre.genre}`)}</div>
//                         <div class="movie__average movie__average--${getClassByRate(element.rating)}">${element.rating}</div>
//                         <div class="movie__year">${element.year}</div>
//                     </div>
//         `
//         moviesEl.appendChild(movieEl)
//     })
// }

const form = document.querySelector("form")
const search = document.querySelector(".header__search")

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
    if (search.value) {
        getMovies(apiSearchUrl)

        search.value = ""
    }
})

