"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = 'd0a03d69b648864175d93fd46a6c9fff';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const movieContainer = document.querySelector('.movie-container');
let currentButton = document.querySelector('.active');
function fetchData(curBtn_1) {
    return __awaiter(this, arguments, void 0, function* (curBtn, segment = 'discover/movie') {
        //to reset the currentButton either place it inside the fn or re-assign it at the end of each iteration
        //console.log(currentButton, curBtn);
        movieContainer.innerHTML = ''; //resetting the container
        currentButton.classList.remove('active'); //resetting the button color
        curBtn.classList.add('active');
        currentButton = curBtn;
        try {
            const response = yield fetch(`${BASE_URL}/${segment}?api_key=${API_KEY}`
            // `${BASE_URL}/discover/movie?api_key=${API_KEY}`
            //`${BASE_URL}/discover/tv?api_key=${API_KEY}`
            //`${BASE_URL}/movie/popular?api_key=${API_KEY}`
            //`${BASE_URL}/movie/changes?api_key=${API_KEY}`
            );
            if (!response.ok)
                throw new Error('Error while fetching data!');
            const data = yield response.json();
            if (!data)
                throw new Error('No data for this category!');
            //console.log(data);
            data.results.forEach((result) => {
                // <div class="card" style="width: 18rem;">
                const html = `
        <div data-id="${result.id}" class="card col  bg-primary-subtle"  style="width: 18rem;">
          <img src="${IMAGE_BASE_URL + '/' + (result === null || result === void 0 ? void 0 : result.poster_path)}" class="card-img-top img-fluid" alt="...">
          <div class="card-body h-75">
            <h5 class="card-title fs-6 fw-bold">${result.title}</h5>
            <button href="#" class="btn btn-primary btn-view-details">View</button>
          </div>
        </div>
      `;
                movieContainer.insertAdjacentHTML('afterbegin', html);
            });
        }
        catch (e) {
            console.error(e);
        }
    });
}
function init() {
    fetchData(currentButton);
}
init();
movieContainer.addEventListener('click', (e) => {
    const eventTarget = e.target;
    // if (e?.target?.classList.contains('btn-view-details')) {
    // if ((e.target as HTMLElement)?.className.includes('btn-view-details')) {
    if (eventTarget === null || eventTarget === void 0 ? void 0 : eventTarget.className.includes('btn-view-details')) {
        e.preventDefault();
        console.log('btn clicked!');
        console.log(window.location);
        window.location.pathname = '/ahmed';
    }
    //console.log(e);
});
/*
 const html: string = `
        <div class="card" style="width: 18rem;">
          <img src="${
            IMAGE_BASE_URL + '/' + result?.poster_path
          }" class="card-img-top img-fluid   " alt="...">
          <div class="card-body">
            <h5 class="card-title">${result.title}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">View Details</a>
          </div>
        </div>
      `;
*/
