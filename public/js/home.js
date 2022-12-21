const selectorMain = document.querySelector(".main");

fetch(genres_list_http + new URLSearchParams({
    api_key: api_key,
    language: language
}))
.then(res => res.json())
.then(data => {
    data.genres.forEach(item => {
        fetchMoviesListByGenres(item.id, item.name);
    });
});

const fetchMoviesListByGenres = (id, genres) =>{
    fetch(movie_genres_http + new URLSearchParams({
        api_key: api_key,
        language: language,
        with_genres: id,
        page: Math.floor(Math.random()*3)+ 1
    }))
    .then(res => res.json())
    .then(data => {
        makeCategoryElement(`${genres}_movies`, data.results)
    })
    .catch(err => console.log(err));
}

const makeCategoryElement = (category, data) => {
    selectorMain.innerHTML += `
    <div class="movieList">
        <button class="preBtn">
            <img src="img/prev.png" alt="">
        </button>
        <h2 class="movieCateg">${category.replace("_movie", "")}</h2>
        <div class="movieContainer" id="${category}" >
            
        </div>
        <button class="nextBtn">
            <img src="img/next.png" alt="">
        </button>
    </div>
    `
    makeCards(category, data);
}

const makeCards = (id, data) => {
    const movieContainer = document.getElementById(id);

    data.forEach((item, i) => {
        if(item.backdrop_path == null){
            item.backdrop_path = item.poster_path;
            if(item.backdrop_path == null){
                return;
            }
        }
        movieContainer.innerHTML += `
        <div class="movie">
            <img src="${img_url}${item.backdrop_path}" alt="poster">
            <p class="movieTitle">${item.title}</p>
        </div>
        `
    })
    
}
