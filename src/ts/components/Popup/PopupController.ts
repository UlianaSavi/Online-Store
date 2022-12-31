import { Popup } from "./Popup";

const popupBg = document.querySelector('.popup'); // Фон попап окна
const popup = document.querySelector('popup__content'); // Само окно
let openPopupButtons = document.querySelectorAll('.btn'); // Кнопки для показа окна
let closePopupButton = document.querySelector('.close-popup'); // Кнопка для скрытия окна

openPopupButtons.forEach((button) => { // Перебираем все кнопки
  console.log('in listener')
  button.addEventListener('click', (e) => { // Для каждой вешаем обработчик событий на клик
    e.preventDefault(); // Предотвращаем дефолтное поведение браузера
    popupBg?.classList.add('active'); // Добавляем класс 'active' для фона
    popup?.classList.add('active'); // И для самого окна
  })
});

closePopupButton?.addEventListener('click',() => { // Вешаем обработчик на крестик
  popupBg?.classList.remove('active'); // Убираем активный класс с фона
  popup?.classList.remove('active'); // И с окна
});

document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
  if(e.target === popupBg) { // Если цель клика - фот, то:
      popupBg?.classList.remove('active'); // Убираем активный класс с фона
      popup?.classList.remove('active'); // И с окна
  }
});