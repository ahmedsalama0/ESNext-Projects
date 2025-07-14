const API_KEY: string = 'd0a03d69b648864175d93fd46a6c9fff';
const BASE_URL: string = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

let responseData: any[] | null;

const movieContainer: HTMLDivElement =
  document.querySelector('.movie-container')!;

let currentButton: HTMLButtonElement = document.querySelector('.active')!;

const movieDetailsDiv: HTMLDivElement =
  document.querySelector('#movie-details')!;

async function fetchData(
  curBtn: HTMLButtonElement,
  segment: string = 'discover/movie'
): Promise<void> {
  //to reset the currentButton either place it inside the fn or re-assign it at the end of each iteration
  //console.log(currentButton, curBtn);

  movieContainer.innerHTML = ''; //resetting the container
  currentButton.classList.remove('active'); //resetting the button color
  curBtn.classList.add('active');

  currentButton = curBtn;

  try {
    const response: Response = await fetch(
      `${BASE_URL}/${segment}?api_key=${API_KEY}`
      // `${BASE_URL}/discover/movie?api_key=${API_KEY}`
      //`${BASE_URL}/discover/tv?api_key=${API_KEY}`
      //`${BASE_URL}/movie/popular?api_key=${API_KEY}`
      //`${BASE_URL}/movie/changes?api_key=${API_KEY}`
    );

    if (!response.ok) throw new Error('Error while fetching data!');

    const data = await response.json();

    if (!data) throw new Error('No data for this category!');

    responseData = data?.results;
    //console.log(data);
    data.results.forEach((result: any) => {
      // <div class="card" style="width: 18rem;">
      const html: string = `
        <div data-id="${
          result.id
        }" class="card col  bg-primary-subtle"  style="width: 18rem;">
          <img src="${
            IMAGE_BASE_URL + '/' + result?.poster_path
          }" class="card-img-top img-fluid" alt="...">
          <div class="card-body h-75">
            <h5 class="card-title fs-6 fw-bold">${result.title}</h5>
            <button class="btn btn-primary btn-view-details">View</button>
          </div>
        </div>
      `;
      movieContainer.insertAdjacentHTML('afterbegin', html);
    });
  } catch (e) {
    console.error(e);
  }
}

function init(): void {
  fetchData(currentButton);
}
init();

movieContainer.addEventListener('click', (e: MouseEvent) => {
  const eventTarget = <HTMLElement>e.target;
  const id = eventTarget.closest('.card')?.getAttribute('data-id');
  const windowURL = window.location.href;
  const url = new URL(windowURL);
  // if (e?.target?.classList.contains('btn-view-details')) {
  // if ((e.target as HTMLElement)?.className.includes('btn-view-details')) {
  if (eventTarget?.className.includes('btn-view-details')) {
    if (!responseData) return;
    console.log(responseData);
    let curCardDetails = responseData.find((result) => result?.id == id);
    if (!curCardDetails) return;
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
    if (!movieContainer) return;
    movieDetailsDiv
      .querySelector('img')
      ?.setAttribute('src', `${IMAGE_BASE_URL}/${curCardDetails?.poster_path}`);
    const cardTitle: HTMLHeadingElement =
      movieDetailsDiv.querySelector('.card-title')!;

    const cardText: HTMLHeadingElement =
      movieDetailsDiv.querySelector('.card-text')!;

    const cardRating: HTMLHeadingElement = movieDetailsDiv.querySelector(
      '.text-body-secondary'
    )!;

    cardTitle.textContent = curCardDetails?.title;
    cardText.textContent = curCardDetails?.overview;
    cardRating.innerHTML =
      '<strong>Rating: </strong>' + curCardDetails?.vote_average + '⭐';

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

window.onpopstate = function (e: Event) {
  console.log(e);
};

function goBack(): void {
  movieContainer.classList.remove('d-none');
  movieDetailsDiv.classList.add('d-none');
  history.back();
}

function logout(): void {
  window.location.replace('index.html');
}
