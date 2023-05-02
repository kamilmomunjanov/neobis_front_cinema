

const API_KEY = "f636e85f-179e-4dc1-851f-737d2ed75264";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_TOP_CURRENT_MONTH = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=MAY"
const API_URL_TOP_EXPECTED_FILMS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1"
const API_URL_TOP_BEST_FILMS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1"
const API_URL_TOP_RELEASES = "https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2020&month=JANUARY&page=1"


let favorites = []


console.log(favorites)
if (localStorage.getItem('favorites') !== null){
    favorites = JSON.parse(localStorage.getItem('favorites'))
}

document.querySelector(".header__favorite").addEventListener("click", (e) =>{
    if (favorites !== null) {
        const moviesEl =document.querySelector(".movies")
        moviesEl.innerHTML = "";
            const movieEl = document.createElement("div")
            movieEl.classList.add("movie")
        console.log(favorites.map((el) =>{
            return el
        }))
    }else{
        console.log("bad")
    }
})

const headerLinks = document.querySelectorAll('.header__nav-link')

Array.from(headerLinks).forEach((item) => {
    item.addEventListener('click', () => {
        switch (item.id) {
            case 'month' : {
                getMovies(API_URL_TOP_CURRENT_MONTH, 'items')
            }
            break
            case 'wait':{
                getMovies(API_URL_TOP_EXPECTED_FILMS, 'films')
            }
            break
            case 'best':{
                getMovies(API_URL_TOP_BEST_FILMS, "films")
            }
            break
            case 'release':{
                getMovies(API_URL_TOP_RELEASES, "releases")
            }
            case 'favorite':{
                getMovies()
            }
            break
            default : console.log('Ошибка !')
        }
    })
})

getMovies(API_URL_POPULAR, 'films');
async function getMovies(url, arr) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY
        }
    })
    const respData = await resp.json()
    console.log(respData)
    await showMovies(respData, arr)
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

function showMovies(data, arr) {
    const moviesEl =document.querySelector(".movies")
    console.log(data)
    moviesEl.innerHTML = "";
    data[arr].filter((el, idx) => idx < 12).forEach(el => {
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
                        ${el.rating && `<div class="movie__average movie__average--${getClassByRate(el.rating)}">${el.rating}</div>`}
                        <div class="movie__heart"><button  data-id="${el.filmId}" class="movie__heart-btn" type="button">OK</button></div>
                        <div class="movie__year">${el.year}</div>
                    </div>
        `
        moviesEl.appendChild(movieEl)
    })


    let favoritesBtn = document.querySelectorAll('.movie__heart-btn')

    Array.from(favoritesBtn).forEach((item) => {
        item.addEventListener('click', () => {
            console.log(item.dataset)
            if (favorites.some(el => el.filmId == item.dataset.id)){
                favorites = favorites.filter(el => el.filmId != item.dataset.id)
            } else {
                favorites = [...favorites, data[arr].find(el => el.filmId == item.dataset.id)]
            }
            localStorage.setItem('favorites', JSON.stringify(favorites))
        })
    })
}


//     let favoritesBtn = document.querySelectorAll('.movie__cover')
//
//     Array.from(favoritesBtn).forEach((item) => {
//         item.addEventListener('click', () => {
//             console.log(item.dataset)
//             if (favorites.some(el => el.filmId == item.dataset.id)){
//                 favorites = favorites.filter(el => el.filmId != item.dataset.id)
//             } else {
//                 favorites = [...favorites, data[arr].find(el => el.filmId == item.dataset.id)]
//             }
//             localStorage.setItem('favorites', JSON.stringify(favorites))
//         })
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

