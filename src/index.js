//todo for debuging
// import './scss/index.scss';
// import './index.html';

import {Tomato} from "./js/Tomato.js";

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
const tomato = new Tomato({});
//
// const timer = new Timer('tomato one');
// timer.increaseCounter();
// timer.increaseCounter();
// timer.changeName('tomato two');
// console.log(`Counter name: ${timer.name}, count: ${timer.counter}`);