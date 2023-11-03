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
  
  secToTime(sec) {
    const min = Math.floor(sec / 60);
    
    const seconds = sec - (min * 60);
    return {minutes: min, seconds: seconds};
  }
  
  startTimer() {
    const remainingTime = this.#remainingTime;
    let sec = remainingTime;
    return new Promise(resolve => {
      const timerId = setInterval(() => {
        const {minutes, seconds} = this.secToTime(sec);
        console.log(`${minutes} min: ${seconds} sec`);
        sec--;
        if (sec < 0) {
          clearInterval(timerId);
          resolve();
        }
      }, 1000);
    });
  }
}
