export class Timer {
  #name;
  #counter;
  #seconds;
  #currentSeconds;
  #taskSeconds;
  
  constructor(task, time) {
    this.#name = task.name;
    this.#counter = 1;
    this.time = time;
    this.#seconds = 0;
    this.#currentSeconds = NaN;
    this.#taskSeconds = time.taskSeconds;
  }
  
  secToTime(sec) {
    const min = Math.floor(sec / 60);
    
    const seconds = sec - (min * 60);
    return {minutes: min, seconds: seconds};
  }
  
  pomidorType() {
    const {
      taskSeconds, pauseSeconds, bigPauseSeconds,
    } = this.time;
    switch (true) {
      case (this.#counter > 1 && this.#counter % 6) === 0:
        console.log(`КАЖДАЯ 3-Я ДЛИННАЯ ПАУЗА - 15 мин`);
        this.#seconds = bigPauseSeconds;
        break;
      case (this.#counter > 1 && this.#counter % 2) === 0:
        console.log(`КОРОТКАЯ ПАУЗА - 5 мин`);
        this.#seconds = pauseSeconds;
        break;
      default:
        console.log(`ЗАДАЧА - 25 мин`);
        this.#seconds = taskSeconds;
        this.#currentSeconds = taskSeconds;
        break;
    }
  }
  
  startTimer() {
    this.pomidorType();
    this.#counter += 1;
    
    return new Promise((resolve) => {
      const timerId = setInterval(() => {
        const {minutes, seconds} = this.secToTime(this.#seconds);
        console.log(`${minutes} min: ${seconds} sec`);
        this.#seconds--;
        if (this.#seconds < 0) {
          clearInterval(timerId);
          if(this.#currentSeconds === this.#taskSeconds){
            this.#currentSeconds = NaN;
            resolve(true);
          }else{
            resolve(false);
          }
        }
      }, 1000);
    });
  }
}