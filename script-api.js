const container = document.querySelector('.container');
const errorSection = document.querySelector('.p-error');
const loader = document.querySelector('.loader');

function removeActiveClass() {
  document
    .querySelectorAll('.nav-list li')
    .forEach((li) => li.classList.remove('active'));
  loader.classList.add('hide');
  errorSection.classList.add('hide');
}

async function fetchData(type, element) {
  removeActiveClass();
  element.classList.add('active');
  try {
    loader.classList.remove('hide');

    let response = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${type}`
    );

    let data = await response.json();

    //clear container if it contains data
    if (container == null) return;
    container.innerHTML = '';

    if (data.recipes.length < 1) {
      container.classList.add('hide');
      errorSection.remove('hide');
      errorSection.innerText = 'There is no result for the selected item';
      return;
    }

    data.recipes.forEach((recipe) => {
      container.insertAdjacentHTML('afterbegin', produceRecipeCard(recipe));
    });
  } catch (err) {
    container.classList.add('hide');
    errorSection.classList.remove('hide');
    errorSection.innerText = 'Some error occurred while fetching data!';
    console.error(err);
  } finally {
    loader.classList.add('hide');
    console.log(errorSection);
  }
}

function produceRecipeCard({ title, social_rank, image_url, publisher }) {
  let html = `
  <div class="card-recipe">
  <div class="img-div">
  <img class="img-recipe" src="${image_url}" alt="recipe-photo" />
  </div>
  <div class="card-body">
  <div class="card-body-top">
  <p class="card-title">
  ${title}
  </p>
  <p class="social-rank">${social_rank.toString().slice(0, 4)}%</p>
  </div>
  <hr/>
  </div>
  <div class="card-footer">
  <small class="card-publisher">
  ${publisher}
  </small>
  </div>
  </div>
  `;
  return html;
}
