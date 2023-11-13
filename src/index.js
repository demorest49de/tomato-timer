// todo for debuging
// import './scss/index.scss';
// import './index.html';

import {Tomato} from './js/Tomato.js';

let count = 0;
const imp = ['default', 'important', 'so-so'];
document.querySelector('.button-importance').addEventListener('click', ({target}) => {
  count += 1;
  if (count >= imp.length) {
    count = 0;
  }
  console.log(' count: ', count);
  for (let i = 0; i < imp.length; i++) {
    if (count === i) {
      target.classList.add(imp[i]);
    } else {
      target.classList.remove(imp[i]);
    }
  }
});

const tasks = [
  {
    id: 1,
    name: 'Сверстать сайт',
    priority: 1,
    isActive: false,
    finishedPomidoro: 0,
  },
  {
    id: 2,
    name: 'Заплатить за квартиру',
    priority: 2,
    isActive: true,
    finishedPomidoro: 0,
  },
  {
    id: 3,
    name: 'Почистить свеклу',
    priority: 3,
    isActive: false,
    finishedPomidoro: 0,
  },
];

new Tomato({tasks});
