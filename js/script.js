// global var
const global = {
    currentPage: window.location.pathname
};

// function to get popular movies
async function displayPopularMovies() {
    const { results } = await fetchData('movie/popular');
    console.log(results);
    
    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
                    ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}" />`: `<img src="images/flexLogo.jpg" class="card-img-top" alt="${movie.title}" />`}
                </a>
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">
                        <small class="text-muted">Release: ${movie.release_date}</small>
                    </p>
                </div>`;
        document.querySelector('#popular-movies').appendChild(div);
    });
}
// function to get current theater movies
async function displayCurrentMovies() {
    const { results } = await fetchData('movie/now_playing');
    console.log(results);
    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
                    ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}" />`: `<img src="images/flexLogo.jpg" class="card-img-top" alt="${movie.title}" />`}
                </a>
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">
                        <small class="text-muted">Release: ${movie.release_date}</small>
                    </p>
                </div>`;
        document.querySelector('#popular-movies').appendChild(div);
    });
}

// function to fetch data from TMDB API
async function fetchData(endpoint) {
    // DO NOT use this key for commercial, use only for educational use only
    // get your own at https://developer.themoviedb.org
    const API_KEY = 'e706601ff1e7f1e208a21d74f74f75de';
    const API_URL = 'https://api.themoviedb.org/3/';

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();

    return data;
}

// show loading spinner
function showSpinner() {

}

// highlight active link of header page
function highLightLink() {
    const links = document.querySelectorAll('.nav-link');

    links.forEach((link) => {
        console.log(link);
        if (global.currentPage === link.getAttribute('href')) {
            link.classList.add('active');
        }
    })
}

function init() {
    switch(global.currentPage) {
        case '/flexMovieDB/':
        case '/flexMovieDB/index.html':
            console.log("Home Page");
            displayCurrentMovies();
            break;
        case '/flexMovieDB/shows.html':
            console.log("TV Shows Page");
            break;
        case '/flexMovieDB/movie-details.html':
            console.log('Movie Details Page');
            break;
        case '/flexMovieDB/tv-details.html':
            console.log('TV Details Page');
            break;
        case '/flexMovieDB/search.html':
            console.log('Search Page');
            break;
    }
    // activate for all pages
    highLightLink();
}

document.addEventListener('DOMContentLoaded', init);
