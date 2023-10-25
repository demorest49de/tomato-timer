
export class Timer {
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
    
    get name(){
        return this.#name;
    }
    
    get counter(){
        return this.#counter;
    }
}