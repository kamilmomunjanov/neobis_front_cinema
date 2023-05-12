

const API_KEY = "dc570186-81c1-458a-96d6-1a1972ef2765";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_TOP_CURRENT_MONTH = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=MAY"
const API_URL_TOP_EXPECTED_FILMS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1"
const API_URL_TOP_BEST_FILMS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1"
const API_URL_TOP_RELEASES = "https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2020&month=JANUARY&page=1"


let favorites = []


if (localStorage.getItem('favorites') !== null){
    favorites = JSON.parse(localStorage.getItem('favorites'))
}

if (localStorage.getItem('favoritesButton') !== null){
    favorites = JSON.parse(localStorage.getItem('favoritesButton'))
}

if (localStorage.getItem('favoritesBtn') !== null){
    favorites = JSON.parse(localStorage.getItem('favoritesBtn'))
}



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


    document.querySelector("#favorite").addEventListener("click", (e) =>{
            const moviesEl =document.querySelector(".movies")
            moviesEl.innerHTML = "";

            favorites.forEach((el) =>{
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
                        <div class="movie__heart"><button data-id="${el.filmId}"  class="movie__heart-btn" type="button"><img class="heart" src="../assets/heart.png" alt="heart"></button></div>
                        <div class="movie__year">${el.year}</div>
                    </div>
        `

                moviesEl.appendChild(movieEl)
            })
        let favoritesButton = document.querySelectorAll('.movie__heart-btn')

        Array.from(favoritesButton).forEach((item) => {
            item.addEventListener('click', () => {
                console.log(item.dataset)
                if (favorites.some(el => el.filmId == item.dataset.id)){
                    item.style.backgroundColor = "grey"
                    favorites = favorites.filter(el => el.filmId != item.dataset.id)

                } else {
                    item.style.backgroundColor = "red"
                    favorites = [...favorites, item.find(el => el.filmId == item.dataset.id)]

                }
                localStorage.setItem('favorites', JSON.stringify(favorites))
                localStorage.setItem('favoritesButton', JSON.stringify(item.style.backgroundColor))
            })
            if (favorites.some(el => el.filmId == item.dataset.id)) {
                item.style.backgroundColor = "red"
            }else {
                item.style.backgroundColor = "grey"
            }
            localStorage.setItem('favoritesButton', JSON.stringify(item.style.backgroundColor))
        })
        //
        // Array.from(favoritesButton).forEach((el) => {
        //     el.addEventListener('click', () => {
        //         if (localStorage.getItem('favorites') !== null) {
        //             el.style.backgroundColor = "red"
        //         }else {
        //             el.style.backgroundColor = "grey"
        //         }
        //         localStorage.setItem('favorites', JSON.stringify(favorites))
        //     })
        // })

    })




const headerLinks = document.querySelectorAll('.header__nav-link')

Array.from(headerLinks).forEach((item) => {
    item.addEventListener('click', () => {
        switch (item.id) {
            case 'month' : {
                getMovies(API_URL_TOP_EXPECTED_FILMS, 'films')
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
            break
            default : console.log('Ошибка !')
        }
    })
})



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
                        <div style={} class="movie__heart"><button data-id="${el.filmId}" class="movie__heart-btn" type="button"><img class="heart" src="../assets/heart.png" alt="heart"></button></div>
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
                item.style.backgroundColor = "grey"
            } else {
                favorites = [...favorites, data[arr].find(el => el.filmId == item.dataset.id)]
                item.style.backgroundColor = "red"
            }
            localStorage.setItem('favorites', JSON.stringify(favorites))
            localStorage.setItem('favoritesBtn', JSON.stringify(item.style.backgroundColor))
        })
        if (favorites.some(el => el.filmId == item.dataset.id)) {
            item.style.backgroundColor = "red"
        }else {
            item.style.backgroundColor = "grey"
        }
        localStorage.setItem('favoritesButton', JSON.stringify(item.style.backgroundColor))
    })

    // Array.from(favoritesBtn).forEach((el) => {
    //     el.addEventListener('click', () => {
    //         if (localStorage.getItem('favorites') !== null) {
    //             el.style.backgroundColor = "red"
    //         }else {
    //             el.style.backgroundColor = "grey"
    //         }
    //         localStorage.setItem('favorites', JSON.stringify(favorites))
    //     })
    // })

}


const form = document.querySelector("form")
const search = document.querySelector(".header__search")

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`
    if (search.value) {
        getMovies(apiSearchUrl, "films")

        search.value = ""
    }else {
        console.log("Error")
    }
})

