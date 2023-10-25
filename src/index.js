import './scss/index.scss';
import './index.html';

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

console.log(' Date.now(): ', Date.now().toString());

class Timer {
    #name;
    #counter;
    #id;
    constructor(name = '', counter = 0) {
        this.#name = name;
        this.#counter = counter;
        this.#id = Date.now().toString();
    }
    
    increaseCounter() {
        this.#counter += 1;
    }
    
    changeName(value) {
        this.#name = value;
    }
}