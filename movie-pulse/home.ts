const API_KEY: string = 'd0a03d69b648864175d93fd46a6c9fff';
const BASE_URL: string = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const movieContainer: HTMLDivElement =
  document.querySelector('.movie-container')!;

let currentButton: HTMLButtonElement = document.querySelector('.active')!;

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
    //console.log(data);

    data.results.forEach((result: any) => {
      // <div class="card" style="width: 18rem;">
      const html: string = `
        <div class="card col border border-1 border-black"  style="width: 18rem;">
          <img src="${
            IMAGE_BASE_URL + '/' + result?.poster_path
          }" class="card-img-top" alt="...">
          <div class="card-body h-75">
            <h5 class="card-title fs-6 fw-bold">${result.title}</h5>
            <a href="#" class="btn btn-primary">View</a>
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
