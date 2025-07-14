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
let responseData;
const movieContainer = document.querySelector('.movie-container');
let currentButton = document.querySelector('.active');
const movieDetailsDiv = document.querySelector('#movie-details');
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
            responseData = data === null || data === void 0 ? void 0 : data.results;
            //console.log(data);
            data.results.forEach((result) => {
                // <div class="card" style="width: 18rem;">
                const html = `
        <div data-id="${result.id}" class="card col  bg-primary-subtle"  style="width: 18rem;">
          <img src="${IMAGE_BASE_URL + '/' + (result === null || result === void 0 ? void 0 : result.poster_path)}" class="card-img-top img-fluid" alt="...">
          <div class="card-body h-75">
            <h5 class="card-title fs-6 fw-bold">${result.title}</h5>
            <button class="btn btn-primary btn-view-details">View</button>
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
    var _a, _b;
    const eventTarget = e.target;
    const id = (_a = eventTarget.closest('.card')) === null || _a === void 0 ? void 0 : _a.getAttribute('data-id');
    const windowURL = window.location.href;
    const url = new URL(windowURL);
    // if (e?.target?.classList.contains('btn-view-details')) {
    // if ((e.target as HTMLElement)?.className.includes('btn-view-details')) {
    if (eventTarget === null || eventTarget === void 0 ? void 0 : eventTarget.className.includes('btn-view-details')) {
        if (!responseData)
            return;
        console.log(responseData);
        let curCardDetails = responseData.find((result) => (result === null || result === void 0 ? void 0 : result.id) == id);
        if (!curCardDetails)
            return;
        console.log(curCardDetails);
        //e.preventDefault();
        //console.log('btn clicked!');
        //console.log(window.location);
        //url.searchParams.set('id', '5');
        //history.pushState({ id: 5 }, '', url + 'ahmed');
        //history.pushState({ id: 5 }, '', url + '/ahmed');
        // history.pushState({ id: 5 }, '', '/ahmed');
        //history.pushState({}, '', 'ahmed');
        //history.pushState({}, '', `/details/${5}`);
        history.pushState({ id }, '', `${location.pathname}/details/${id}`);
        //history.replaceState({ id: 5 }, '', `${location.pathname}/details/${5}`);
        //console.log(url);
        //handling the movie details
        if (!movieContainer)
            return;
        (_b = movieDetailsDiv
            .querySelector('img')) === null || _b === void 0 ? void 0 : _b.setAttribute('src', `${IMAGE_BASE_URL}/${curCardDetails === null || curCardDetails === void 0 ? void 0 : curCardDetails.poster_path}`);
        const cardTitle = movieDetailsDiv.querySelector('.card-title');
        const cardText = movieDetailsDiv.querySelector('.card-text');
        const cardRating = movieDetailsDiv.querySelector('.text-body-secondary');
        cardTitle.textContent = curCardDetails === null || curCardDetails === void 0 ? void 0 : curCardDetails.title;
        cardText.textContent = curCardDetails === null || curCardDetails === void 0 ? void 0 : curCardDetails.overview;
        cardRating.innerHTML =
            '<strong>Rating: </strong>' + (curCardDetails === null || curCardDetails === void 0 ? void 0 : curCardDetails.vote_average) + '⭐';
        movieContainer.classList.add('d-none');
        movieDetailsDiv.classList.remove('d-none');
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
// window.addEventListener('DOMContentLoaded', (e: Event) => {
//   console.log('fired!');
//   const path = window.location.pathname;
//   const match = path.match(/^\/details\/(\d+)$/);
//   console.log(match);
//   if (match) window.location.href = BASE_URL;
// });
window.onpopstate = function (e) {
    console.log(e);
};
function goBack() {
    movieContainer.classList.remove('d-none');
    movieDetailsDiv.classList.add('d-none');
    history.back();
}
function logout() {
    window.location.replace('index.html');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0sT0FBTyxHQUFXLGtDQUFrQyxDQUFDO0FBQzNELE1BQU0sUUFBUSxHQUFXLDhCQUE4QixDQUFDO0FBQ3hELE1BQU0sY0FBYyxHQUFHLGlDQUFpQyxDQUFDO0FBRXpELElBQUksWUFBMEIsQ0FBQztBQUUvQixNQUFNLGNBQWMsR0FDbEIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBRSxDQUFDO0FBRTlDLElBQUksYUFBYSxHQUFzQixRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBRSxDQUFDO0FBRTFFLE1BQU0sZUFBZSxHQUNuQixRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFFLENBQUM7QUFFNUMsU0FBZSxTQUFTO3lEQUN0QixNQUF5QixFQUN6QixVQUFrQixnQkFBZ0I7UUFFbEMsdUdBQXVHO1FBQ3ZHLHFDQUFxQztRQUVyQyxjQUFjLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLHlCQUF5QjtRQUN4RCxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLDRCQUE0QjtRQUN0RSxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUvQixhQUFhLEdBQUcsTUFBTSxDQUFDO1FBRXZCLElBQUksQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFhLE1BQU0sS0FBSyxDQUNwQyxHQUFHLFFBQVEsSUFBSSxPQUFPLFlBQVksT0FBTyxFQUFFO1lBQzNDLGtEQUFrRDtZQUNsRCw4Q0FBOEM7WUFDOUMsZ0RBQWdEO1lBQ2hELGdEQUFnRDthQUNqRCxDQUFDO1lBRUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztZQUVoRSxNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVuQyxJQUFJLENBQUMsSUFBSTtnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFFekQsWUFBWSxHQUFHLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxPQUFPLENBQUM7WUFDN0Isb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBVyxFQUFFLEVBQUU7Z0JBQ25DLDJDQUEyQztnQkFDM0MsTUFBTSxJQUFJLEdBQVc7d0JBRWpCLE1BQU0sQ0FBQyxFQUNUO3NCQUVJLGNBQWMsR0FBRyxHQUFHLElBQUcsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFdBQVcsQ0FDNUM7O2tEQUV3QyxNQUFNLENBQUMsS0FBSzs7OztPQUl2RCxDQUFDO2dCQUNGLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsQ0FBQztJQUNILENBQUM7Q0FBQTtBQUVELFNBQVMsSUFBSTtJQUNYLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBQ0QsSUFBSSxFQUFFLENBQUM7QUFFUCxjQUFjLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBYSxFQUFFLEVBQUU7O0lBQ3pELE1BQU0sV0FBVyxHQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDO0lBQzFDLE1BQU0sRUFBRSxHQUFHLE1BQUEsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsMENBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pFLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQ3ZDLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9CLDJEQUEyRDtJQUMzRCwyRUFBMkU7SUFDM0UsSUFBSSxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLFlBQVk7WUFBRSxPQUFPO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUIsSUFBSSxjQUFjLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsRUFBRSxLQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxjQUFjO1lBQUUsT0FBTztRQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTVCLHFCQUFxQjtRQUVyQiw4QkFBOEI7UUFDOUIsK0JBQStCO1FBRS9CLGtDQUFrQztRQUNsQyxrREFBa0Q7UUFDbEQsbURBQW1EO1FBQ25ELDhDQUE4QztRQUM5QyxxQ0FBcUM7UUFDckMsNkNBQTZDO1FBQzdDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxRQUFRLENBQUMsUUFBUSxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEUsMkVBQTJFO1FBQzNFLG1CQUFtQjtRQUVuQiw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLGNBQWM7WUFBRSxPQUFPO1FBQzVCLE1BQUEsZUFBZTthQUNaLGFBQWEsQ0FBQyxLQUFLLENBQUMsMENBQ25CLFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxjQUFjLElBQUksY0FBYyxhQUFkLGNBQWMsdUJBQWQsY0FBYyxDQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDNUUsTUFBTSxTQUFTLEdBQ2IsZUFBZSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUUsQ0FBQztRQUVoRCxNQUFNLFFBQVEsR0FDWixlQUFlLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBRSxDQUFDO1FBRS9DLE1BQU0sVUFBVSxHQUF1QixlQUFlLENBQUMsYUFBYSxDQUNsRSxzQkFBc0IsQ0FDdEIsQ0FBQztRQUVILFNBQVMsQ0FBQyxXQUFXLEdBQUcsY0FBYyxhQUFkLGNBQWMsdUJBQWQsY0FBYyxDQUFFLEtBQUssQ0FBQztRQUM5QyxRQUFRLENBQUMsV0FBVyxHQUFHLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxRQUFRLENBQUM7UUFDaEQsVUFBVSxDQUFDLFNBQVM7WUFDbEIsMkJBQTJCLElBQUcsY0FBYyxhQUFkLGNBQWMsdUJBQWQsY0FBYyxDQUFFLFlBQVksQ0FBQSxHQUFHLEdBQUcsQ0FBQztRQUVuRSxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QyxlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsaUJBQWlCO0FBQ25CLENBQUMsQ0FBQyxDQUFDO0FBRUg7Ozs7Ozs7Ozs7Ozs7RUFhRTtBQUVGLDhEQUE4RDtBQUM5RCwyQkFBMkI7QUFDM0IsMkNBQTJDO0FBQzNDLG9EQUFvRDtBQUNwRCx3QkFBd0I7QUFDeEIsZ0RBQWdEO0FBQ2hELE1BQU07QUFFTixNQUFNLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBUTtJQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLENBQUMsQ0FBQztBQUVGLFNBQVMsTUFBTTtJQUNiLGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNqQixDQUFDO0FBRUQsU0FBUyxNQUFNO0lBQ2IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDeEMsQ0FBQyJ9