//Разработать веб-приложение, которое каждый день будет отображать новое случайное изображение из коллекции Unsplash,
// давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению

const getApi = 'LzuUz9AjbvXzq_Zt0fa48JBHMzA3oidrigOCg3EPAgo';
const checkApi = async () => {
  const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${getApi}`);
  const getData = await response.json();
  if (!response.ok) {
    throw new Error('object not found');
  }
  return getData;
};

async function getPhoto() {
  const getData = await checkApi();
  console.log(getData);
  getRandomPhoto(getData);
  likePhoto(getData);
}
getPhoto();

const viewPhotoEl = document.querySelector('.viewPhoto');
let upCountLike = 0;

function getRandomPhoto(data) {
  localStorage.setItem('prev', data.urls.full);
  viewPhotoEl.insertAdjacentHTML("beforeend", `
        <div class="container">
            <div class="contentPhoto"><img class="photo" src="${data.urls.full}" alt="${data.alt_description}"></div>
            <div class="contentLike">
                <div class="like"><img id="like" src="./image/like.svg" alt="like"></div>
                <div class="viewLike">${data.likes}</div>
                <div class="like"><img id="dislike" src="./image/dislikeBlack.svg" alt="dislike"></div>
            </div>
            <div class="contentName">Photo by: ${data.user.first_name}</div>
        </div>
    `)
}

function likePhoto(data) {
  upCountLike = data.likes;
  const likeElem = document.getElementById('like');
  const dislikeEl = document.getElementById('dislike');
  const viewLikeElem = document.querySelector('.viewLike');

  likeElem.addEventListener('click', function (event) {
    upCountLike++;
    viewLikeElem.textContent = upCountLike;
  });
  dislikeEl.addEventListener('click', function (event) {
    upCountLike--;
    viewLikeElem.textContent = upCountLike;
  });
}