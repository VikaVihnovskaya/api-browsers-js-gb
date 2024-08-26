//Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе. Каждое занятие имеет название,
// время проведения, максимальное количество участников и текущее количество записанных участников.
//
// 1. Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.
//
// 2. Загрузите информацию о занятиях из предоставленных JSON-данных. Каждое занятие должно отображаться на странице с
// указанием его названия, времени проведения, максимального количества участников и текущего количества записанных
// участников.
//
// 3. Пользователь может нажать на кнопку "Записаться" для записи на занятие. Если максимальное количество участников
// уже достигнуто, кнопка "Записаться" становится неактивной.
//
// 4. После успешной записи пользователя на занятие, обновите количество записанных участников и состояние кнопки
// "Записаться".
//
// 5. Запись пользователя на занятие можно отменить путем нажатия на кнопку "Отменить запись". После отмены записи,
// обновите количество записанных участников и состояние кнопки.
//
// 6. Все изменения (запись, отмена записи) должны сохраняться и отображаться в реальном времени на странице.
//
// 7. При разработке используйте Bootstrap для стилизации элементов.


// const url = "./data.json";
// async function fetchData(url) {
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log(error.message);
//   }
// }
const classesElem = document.querySelector(".timetable__classes");

fetch('data.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(classes => {
        classesElem.insertAdjacentHTML('afterbegin', `
            <div class="card shadow-sm container classes__content border border-primary" style="width: 18rem;">
                <div class="card-body ">
                    <h5 class="card-title classes__title">${classes.title}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item classes__time">Время занятия: ${classes.time}</li>
                    <li class="list-group-item classes__maxCountVisitors">Максимальное кол-во участников: ${classes.maxCountVisitors}</li>
                    <li class="list-group-item classes__recordVisitors">Участников записано: ${classes.recordVisitors}</li>
                    <li class="list-group-item classes__vacant-places">Свободно мест: ${classes.maxCountVisitors - classes.recordVisitors}</li>
                </ul>
                <div class="card-body d-flex  justify-content-center">
                    <button class="classes__buttonRegister btn btn-outline-primary">Записаться</button>
                    <button class="classes__buttonCancel btn btn-outline-danger" style="display: none;">Отменить запись</button>
                </div>
            </div>
`);

        let registerBtn = document.querySelector('.classes__buttonRegister')
        let cancelBtn = document.querySelector('.classes__buttonCancel');

        if (classes.maxCountVisitors - classes.recordVisitors === 0) {
          registerBtn.classList.replace('btn-outline-success', 'btn-outline-secondary');
          registerBtn.setAttribute('disabled', '');
        }
        registerBtn.addEventListener('click', function (e) {
          const necessaryClass = registerBtn.closest('.classes__content');
          if (classes.maxCountVisitors - classes.recordVisitors > 0 && classes.yourParticipation != true) {
            classes.recordVisitors++;
            classes.yourParticipation = true;
            necessaryClass.querySelector('.classes__vacant-places').textContent = `Свободно мест: ${classes.maxCountVisitors - classes.recordVisitors}`;
            necessaryClass.querySelector('.classes__recordVisitors').textContent = `Участников записано: ${classes.recordVisitors}`;
            necessaryClass.querySelector('.classes__buttonCancel').style.display = 'block';
            registerBtn.classList.replace('btn-outline-primary', 'btn-outline-secondary');
            registerBtn.setAttribute('disabled', '');
          } else if (classes.yourParticipation === true) {
            e.preventDefault();
            alert('Вы уже записались на это занятие');
          }
          else {
            alert('Извините, но все места на это занятие уже заняты');
          }
        });

        cancelBtn.addEventListener('click', function (e) {
          const necessaryClass = registerBtn.closest('.classes__content');
          classes.recordVisitors--;
          classes.yourParticipation = false;
          necessaryClass.querySelector('.classes__vacant-places').textContent = `Свободно мест: ${classes.maxCountVisitors - classes.recordVisitors}`;
          necessaryClass.querySelector('.classes__recordVisitors').textContent = `Участников записано: ${classes.recordVisitors}`;
          cancelBtn.style.display = 'none';
          registerBtn.classList.replace('btn-outline-secondary', 'btn-outline-primary');
          registerBtn.removeAttribute('disabled');
        });

      });
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));