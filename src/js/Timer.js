
let idCounter = 0;
export class Timer {
    #name;
    #counter;
    #id;
    
    constructor(name = '', counter = 0) {
        idCounter += 1;
        this.#name = name;
        this.#counter = counter;
        this.#id = idCounter;
    }
    
    increaseCounter() {
        this.#counter += 1;
    }
    
    changeName(value) {
        this.#name = value;
    }
    
    get name(){
        return this.#name;
    }
    
    get counter(){
        return this.#counter;
    }
    
    startTimer(estimated) {
        let sec = estimated * 60;
        const timerId = setInterval(() => {
            console.clear();
            console.log(` seconds left: ${sec}`);
            sec--;
            if (sec < 0) {
                clearInterval(timerId);
                this.increaseCounter();
                console.clear();
                return true;
            }
        }, 1000);
    }
}