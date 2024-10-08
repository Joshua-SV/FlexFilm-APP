// global var
const global = {
    currentPage: window.location.pathname,
    search: {
        term: '',
        type: '',
        page: 1,
        totalPg: 1,
        totalResults: 0
    },
    api: {
        apiKey: 'e706601ff1e7f1e208a21d74f74f75de',
        apiURL: 'https://api.themoviedb.org/3/',
    }
};

// function to get popular movies
async function displayPopularMovies() {
    const { results } = await fetchData('movie/popular');
    
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
// function for swiper mods
function initSwiper() {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        breakpoints: {
            500: {
                slidesPerView: 2
            },
            700: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4
            }
        }
    });
}

// function to get current theater movies
async function displayCurrentMovies() {
    const { results } = await fetchData('movie/now_playing');

    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
            ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" class="card-img-top" alt="${movie.title}" />`: `<img src="images/flexLogo.jpg" class="card-img-top" alt="${movie.title}" />`}
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
            </h4>`;
        document.querySelector('.swiper-wrapper').appendChild(div);
        initSwiper();
    });
}
// function to get current tv shows
async function displayCurrentTV() {
    const { results } = await fetchData('tv/airing_today');

    results.forEach(tv => {
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `<a href="tv-details.html?id=${tv.id}">
            ${tv.poster_path ? `<img src="https://image.tmdb.org/t/p/w300${tv.poster_path}" class="card-img-top" alt="${tv.name}" />`: `<img src="images/flexLogo.jpg" class="card-img-top" alt="${tv.name}" />`}
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${tv.vote_average.toFixed(1)} / 10
            </h4>`;
        document.querySelector('.swiper-wrapper').appendChild(div);
        initSwiper();
    });
}

// function to get popular TV shows
async function displayPopularTV() {
    const { results } = await fetchData('tv/popular');
    
    results.forEach(tv => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `<a href="tv-details.html?id=${tv.id}">
                    ${tv.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${tv.poster_path}" class="card-img-top" alt="${tv.name}" />`: `<img src="images/flexLogo.jpg" class="card-img-top" alt="${tv.name}" />`}
                </a>
                <div class="card-body">
                    <h5 class="card-title">${tv.name}</h5>
                    <p class="card-text">
                        <small class="text-muted">Aired: ${tv.first_air_date}</small>
                    </p>
                </div>`;
        document.querySelector('#popular-shows').appendChild(div);
    });
}
// format numbers
function formatNumber(num) {
    if (num < 1000) {
      return num.toString();
    } else if (num < 1000000) {
      return (num / 1000).toFixed(1) + ' Thousand';
    } else if (num < 1000000000) {
      return (num / 1000000).toFixed(1) + ' Million';
    } else {
      return (num / 1000000000).toFixed(1) + ' Billion';
    }
  }
// format time
function formatTime(num) {
    return (num / 60.0).toFixed(1) + ' Hours';
  }

// display background on page details
function displayBackImage(type, path) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.opacity = '0.1';

    if (type === 'movie') {
        document.querySelector('#movie-details').appendChild(overlayDiv);
    }
    else {
        document.querySelector('#show-details').appendChild(overlayDiv);
    }
}

// function to display movie details
async function displayDetailsMovie() {
    const movieID = window.location.search.split('=')[1];

    const movie = await fetchData(`movie/${movieID}`);

    // background image
    displayBackImage('movie', movie.backdrop_path);

    const div = document.createElement('div');
    div.innerHTML = `<div class="details-top">
                <div>
                ${movie.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}" />`: `<img src="images/flexLogo.jpg" class="card-img-top" alt="${movie.title}" />`}
                </div>
                <div>
                    <h2>${movie.title}</h2>
                    <p>
                        <i class="fas fa-star text-primary"></i>
                        ${movie.vote_average.toFixed(1)} / 10
                    </p>
                    <p class="text-muted">Release Date: ${movie.release_date}</p>
                    <p>
                        ${movie.overview}
                    </p>
                    <h5>Genres</h5>
                    <ul class="list-group">
                        ${movie.genres.map(genre => `<li>${genre.name}</li>`).join('')}
                    </ul>
                    <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
                </div>
            </div>
            <div class="details-bottom">
                <h2>Movie Info</h2>
                <ul>
                    <li><span class="text-secondary">Budget:</span> $${new Intl.NumberFormat('en-US').format(movie.budget)} = ${formatNumber(movie.budget)}</li>
                    <li><span class="text-secondary">Revenue:</span> $${new Intl.NumberFormat('en-US').format(movie.revenue)} = ${formatNumber(movie.revenue)}</li>
                    <li><span class="text-secondary">Runtime:</span> ${movie.runtime > 60 ? `${formatTime(movie.runtime)} = ${movie.runtime} Minutes`: `${movie.runtime}`}</li>
                    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
                </ul>
                <h4>Production Companies</h4>
                <div class="list-group">${movie.production_companies.map(company => `<span>${company.name}</span>`).join(', ')}</div>
                <h4>Languages</h4>
                <div class="list-group">${movie.spoken_languages.map(language => `<span>${language.english_name}</span>`).join(', ')}</div>
            </div>`;
    document.querySelector('#movie-details').appendChild(div);
}
// function to display tv details
async function displayDetailsTV() {
    const tvID = window.location.search.split('=')[1];

    const tv = await fetchData(`tv/${tvID}`);

    // background image
    displayBackImage('tv', tv.backdrop_path);

    const div = document.createElement('div');
    div.innerHTML = `<div class="details-top">
                <div>
                ${tv.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${tv.poster_path}" class="card-img-top" alt="${tv.name}" />`: `<img src="images/flexLogo.jpg" class="card-img-top" alt="${tv.name}" />`}
                </div>
                <div>
                    <h2>${tv.name}</h2>
                    <p>
                        <i class="fas fa-star text-primary"></i>
                        ${tv.vote_average.toFixed(1)} / 10
                    </p>
                    <p class="text-muted">First Aired Date: ${tv.first_air_date}</p>
                    <p>
                        ${tv.overview}
                    </p>
                    <h5>Genres</h5>
                    <ul class="list-group">
                        ${tv.genres.map(genre => `<li>${genre.name}</li>`).join('')}
                    </ul>
                    <a href="${tv.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
                </div>
            </div>
            <div class="details-bottom">
                <h2>Show Info</h2>
                <ul>
                    <li><span class="text-secondary">Created By: </span> ${tv.created_by.map(person => `<span>${person.name}</span>`).join(', ')}</li>
                    <li><span class="text-secondary">Networks: </span> ${tv.networks.map(net => `<span>${net.name}</span>`).join(', ')}</li>
                    <li><span class="text-secondary">Number Of Episodes: </span> ${tv.number_of_episodes}</li>
                    <li><span class="text-secondary">Number Of Seasons: </span> ${tv.number_of_seasons}</li>
                    <li><span class="text-secondary">Last Episode To Air: </span> ${tv.last_air_date}</li>
                    <li><span class="text-secondary">Status: </span> ${tv.status}</li>
                </ul>
                <h4>Production Companies</h4>
                <div class="list-group">${tv.production_companies.map(company => `<span>${company.name}</span>`).join(', ')}</div>
                <h4>Production Countries</h4>
                <div class="list-group">${tv.production_countries.map(nation => `<span>${nation.name}</span>`).join(', ')}</div>
                <h4>Languages</h4>
                <div class="list-group">${tv.spoken_languages.map(language => `<span>${language.english_name}</span>`).join(', ')}</div>
            </div>`;
    document.querySelector('#show-details').appendChild(div);
}
// display all movie/tv searchs found
function displaySearchs(data) {
    // clear previous results, headings, and page numbers
    document.querySelector('#search-results').innerHTML = '';
    document.querySelector('#search-results-heading').innerHTML = '';
    document.querySelector('#pagination').innerHTML = '';

    data.forEach(film => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `<a href="${global.search.type}-details.html?id=${film.id}">
                    ${global.search.type === 'movie' ? `${film.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${film.poster_path}" class="card-img-top" alt="${film.title}" />`: `<img src="images/flexLogo.jpg" class="card-img-top" alt="${film.title}" />`}` : `${film.poster_path ? `<img src="https://image.tmdb.org/t/p/w500${film.poster_path}" class="card-img-top" alt="${film.name}" />`: `<img src="images/flexLogo.jpg" class="card-img-top" alt="${film.name}" />`}`}
                </a>
                <div class="card-body">
                    <h5 class="card-title">${global.search.type === 'movie' ? film.title : film.name}</h5>
                    <p class="card-text">
                        <small class="text-muted">Release: ${global.search.type === 'movie' ? film.release_date : film.first_air_date}</small>
                    </p>
                </div>`;
        document.querySelector('#search-results').appendChild(div);
    });
    document.querySelector('#search-results-heading').innerHTML = `<h2>${data.length} of ${global.search.totalResults} For ${global.search.term.split(/[+]/).join(' ')}</h2>`;
    displayPagination();
}

// display pagination for search
function displayPagination() {
    const div = document.createElement('div');
    div.classList.add('pagination');
    div.innerHTML = `<button class="btn btn-primary" id="prev">Prev</button>
                <button class="btn btn-primary" id="next">Next</button>
                <div class="page-counter">Page ${global.search.page} of ${global.search.totalPg}</div>`;
    document.querySelector('#pagination').appendChild(div);

    // disable prev button if on first page
    if (global.search.page === 1) {
        document.querySelector('#prev').disabled = true;
    }

    // disable next button if on last page
    if (global.search.page === global.search.totalPg) {
        document.querySelector('#next').disabled = true;
    }

    // next page
    document.querySelector('#next').addEventListener('click', async () => {
        global.search.page++;
        const { results , total_pages } = await searchAPI();
        displaySearchs(results);
    });

    // prev page
    document.querySelector('#prev').addEventListener('click', async () => {
        global.search.page--;
        const { results , total_pages } = await searchAPI();
        displaySearchs(results);
    }); 
}

// show loading spinner
function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}
// hide loading spinner
function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

// search movies or shows
async function search() {
    const queryStr = window.location.search.split(/=(.+)&(.+)=(.+)/);
    // cons urlPerm = new URLSearchParams(queryStr);
    console.log(queryStr);

    global.search.type = queryStr[1];
    global.search.term = queryStr[3];

    if (global.search.term !== '' && global.search.term !== null) {
        const { results , total_pages, page, total_results} = await searchAPI();
        console.log(results);

        if (results.length === 0) {
            showAlert(`No Such Film Exists: ${global.search.term}`);
            return;
        }
        global.search.totalResults = total_results;
        global.search.totalPg = total_pages;
        global.search.page = page;

        displaySearchs(results);
        document.querySelector('#search-term').value = '';
    } 
    else {
        showAlert("Please Enter a valid search");
    }
}

// function to fetch data from TMDB API
async function fetchData(endpoint) {
    // DO NOT use this key for commercial, use only for educational use only
    // get your own at https://developer.themoviedb.org
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiURL;
    
    showSpinner();
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    hideSpinner();
    
    return data;
}
// function to fetch search data from TMDB API
async function searchAPI() {
    const API_KEY = global.api.apiKey;
    const API_URL = global.api.apiURL;
    
    showSpinner();
    const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term
    }&page=${global.search.page}`);
    const data = await response.json();
    hideSpinner();
    
    return data;
}

// show alert
function showAlert(message, className = 'error') {
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert', className);

    alertDiv.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(alertDiv);

    setTimeout(() => alertDiv.remove(),3000);
}

// highlight active link of header page
function highLightLink() {
    const links = document.querySelectorAll('.nav-link');

    links.forEach((link) => {
        if (global.currentPage === link.getAttribute('href')) {
            link.classList.add('active');
        }
    })
}

function init() {
    // manual router
    switch(global.currentPage) {
        case '/flexMovieDB/':
        case '/flexMovieDB/index.html':
            console.log("Home Page");
            displayPopularMovies();
            displayCurrentMovies();
            break;
        case '/flexMovieDB/shows.html':
            console.log("TV Shows Page");
            displayCurrentTV();
            displayPopularTV();
            break;
        case '/flexMovieDB/movie-details.html':
            console.log('Movie Details Page');
            displayDetailsMovie();
            break;
        case '/flexMovieDB/tv-details.html':
            console.log('TV Details Page');
            displayDetailsTV();
            break;
        case '/flexMovieDB/search.html':
            console.log('Search Page');
            search();
            break;
    }
    // activate for all pages
    highLightLink();
}

// this triggers the router
document.addEventListener('DOMContentLoaded', init);
