const searchForm = document.querySelector('#search-form'); 
// получаем наш indexed.html, дерево/dom
const movie = document.querySelector('#movies');
const urlPoster ='https://image.tmdb.org/t/p/w500';
function apiSearch(event){
    event.preventDefault();//нет перезагрузки страницы
    // console.log(event);
        //каждый раз новая переменная, так как const
    const searchText = document.querySelector('.form-control').value,
    server = 'https://api.themoviedb.org/3/search/multi?api_key=172a328251c2c1ce0c57aa789bc7794f&language=ru&query=' +
    searchText;
    movie.innerHTML = 'Загрузка...';

    fetch(server)
    .then(function(value){
        console.log();
        if (value.status !== 200){
            return Promise.reject(value);
        }
        return value.json();
    })
    .then(function(output){
        let inner = '';//let тк будет постоянно изменяться

        output.results.forEach(function (item, i, array){
            let nameItem = item.original_name || item.original_title,
            dateItem = item.release_date || item.first_air_date,
            imageItem = urlPoster+item.poster_path,
            overviewItem = item.overview,
            rangeItem = item.vote_average;
            if (item.poster_path === null) {
                imageItem = 'нетфото.png';
            }
            inner +=  
            `
                <div class="card mb-3" style="max-width: 100%;">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img style="max-width: 50%; padding: 20px; border-radius: 30px;" src="${imageItem}" class="card-img" alt="...">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                             <h5 class="card-title">${nameItem}</h5>
                             <p class="card-text">${overviewItem}</p>
                             <p class="card-text"><small class="text-muted">Дата выхода: ${dateItem} Рейтинг: ${rangeItem}</small></p>
                        </div>
                    </div>
                </div>
            </div>
            `;  
        });
        movie.innerHTML = inner;
    })
    .catch(function(reason){
        movie.innerHTML = 'Упс, что-то пошло не так..';
        console.error('error: '+ reason);
    });
}

searchForm.addEventListener('submit', apiSearch);
//обработчик событий