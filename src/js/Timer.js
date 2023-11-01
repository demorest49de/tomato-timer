export class Timer {
    #name;
    #counter;
    #remainingTime;
    
    constructor(name = 'томат',
                counter = 0,
                remainingTime = NaN,
    ) {
        this.#name = name;
        this.#counter = counter;
        this.#remainingTime = remainingTime;
    }
    
    increaseCounter() {
        this.#counter += 1;
    }
    
    changeName(value) {
        this.#name = value;
    }
    
    get name() {
        return this.#name;
    }
    
    get counter() {
        return this.#counter;
    }
    
    startTimer() {
        const remainingTime = this.#remainingTime;
        let sec = remainingTime * 60;
        const timerId = setInterval(() => {
            console.clear();
            console.log(` seconds left: ${sec}`);
            sec--;
            if (sec < 0) {
                clearInterval(timerId);
                // todo счетчик увеличиваем только для завершенных помидорок
                this.increaseCounter();
                console.clear();
                return {remainingTime: 0, counter: this.counter};
            }
        }, 1000);
    }
}