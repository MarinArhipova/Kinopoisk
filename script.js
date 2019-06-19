const searchForm = document.querySelector('#search-form'); 
// получаем наш indexed.html, дерево/dom
const movie = document.querySelector('#movies');
function apiSearch(event){
    event.preventDefault();//нет перезагрузки страницы
    // console.log(event);
        //каждый раз новая переменная, так как const
    const searchText = document.querySelector('.form-control').value,
    server = 'https://api.themoviedb.org/3/search/multi?api_key=172a328251c2c1ce0c57aa789bc7794f&language=ru&query=' +
    searchText;
    requestApi('GET', server);
}

searchForm.addEventListener('submit', apiSearch);
//обработчик событий

function requestApi(method, url){
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.send();//ждет ответ от сервера

    request.addEventListener('readystatechange', () =>{
        if (request.readyState !== 4) return;
        if (request.status !== 200){ console.log('error: '+ request.status);
        return;}

        const output = JSON.parse(request.responseText);
        console.log('output: ', output);
        let inner = '';//let тк будет постоянно изменяться

        output.results.forEach(function (item, i, array){
            let nameItem = item.original_name || item.original_title;
            let dateItem = item.release_date || item.first_air_date;
            let imageItem = item.poster_path;
            let overviewItem = item.overview;
            let rangeItem = item.vote_average;
            inner +=  
            `
                <div class="card mb-3" style="max-width: 100%;">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img style="max-width: 50%; padding: 20px; border-radius: 30px;" src="https://image.tmdb.org/t/p/w500${imageItem}" class="card-img" alt="...">
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

        console.log('request: ', request);
    }); //стрелочная функция
    //readystatechange имеет 5 состояний
}