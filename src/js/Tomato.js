import {Timer} from './Timer.js';

export class Tomato {
  #estimatedTime;
  #pauseTime;
  #bigPauseTime;
  #tasks;
  #activeTask;

  // test
  #seconds = 60;

  constructor({
    estimatedTime = 25 * this.#seconds,
    pauseTime = 5 * this.#seconds,
    bigPauseTime = 15 * this.#seconds,
    tasks = [],
  }) {
    this.#estimatedTime = estimatedTime;
    this.#pauseTime = pauseTime;
    this.#bigPauseTime = bigPauseTime;
    this.#tasks = tasks;
    this.#activeTask = null;

    this.init();

    // test
    this.proceedTask();
  }

  init() {
    // test
    if (!localStorage.getItem('pomidor')) {
      const pomidor = JSON.stringify({
        id: 2,
        name: 'Заплатить за квартиру',
        priority: 2,
        isActive: true,
        counter: 0,
        remainingTime: 0,
      });
      localStorage.setItem('pomidor', pomidor);
    }

    this.#activeTask = JSON.parse(localStorage.getItem('pomidor'));

    // this.#activeTask = this.activeTask;
  }

  get time() {
    return {estimatedTime: this.#estimatedTime, pauseTime: this.#pauseTime, bigPauseTime: this.#bigPauseTime};
  }

  get tasks() {
    return this.#tasks;
  }

  get activeTask() {
    return this.#tasks.find(t => t.isActive);
  }

  addTask(task) {
    this.#tasks.push(task);
  }

  activateTask(id) {
    this.deactivateAllTasks();
    for (const task of this.#tasks) {
      if (task.id === id) {
        task.isActive = true;
        return;
      }
    }
  }

  increaseCounter(id) {
    // test
    this.#activeTask.counter += 1;
    // for (const task of this.#tasks) {
    //     if (task.id === id) {
    //         task.counter += 1;
    //         return;
    //     }
    // }
  }

  deactivateAllTasks() {
    for (const task of this.#tasks) {
      if (task.isActive) task.isActive = false;
    }
  }

  pomidorType(remainingTime, counter) {
    const {estimatedTime, pauseTime, bigPauseTime} = this.time;
    switch (true) {
      case counter % 6 === 0:
        console.log(`КАЖДАЯ 3-Я ДЛИННАЯ ПАУЗА - 15 мин`);
        return remainingTime ? remainingTime : bigPauseTime;
      case counter % 2 === 0:
        console.log(`КОРОТКАЯ ПАУЗА - 5 мин`);
        return remainingTime = remainingTime ? remainingTime : pauseTime;
      default:
        console.log(`ЗАДАЧА - 25 мин`);
        return remainingTime = remainingTime ? remainingTime : estimatedTime;
    }
  }

  proceedTask() {
    if (this.#activeTask) {
      const task = this.#activeTask;
      let remainingTime = task.remainingTime;

      this.increaseCounter(task.id);

      remainingTime = this.pomidorType(remainingTime, task.counter);

      const timer = new Timer(task.name, task.counter, remainingTime);
      console.log(' this.#activeTask: ', this.#activeTask);
      console.log(' task.counter: ', task.counter);
      const timerPromise = timer.startTimer();
      timerPromise.then(() => {
        this.#activeTask.remainingTime = 0;
        console.log(' this.#activeTask: ', this.#activeTask);

        // test
        localStorage.setItem('pomidor', JSON.stringify(this.#activeTask));
        window.location.href = `http://localhost:8080`;
      });
    } else {
      console.log(`Error. No active task available!`);
    }
  }
}
