import {Timer} from './Timer.js';

export class Tomato {
 
  #estimatedSeconds;
  #pauseSeconds;
  #bigPauseSeconds;
  #tasks;
  #activeTask;
  #timer;

  //test
  #seconds = 10;
  
  constructor({
                estimatedSec = 25 * this.#seconds,
                pauseSec = 15 * this.#seconds,
                bigPauseSec = 15 * this.#seconds,
                tasks = []
              }) {
    this.#estimatedSeconds = estimatedSec;
    this.#pauseSeconds = pauseSec;
    this.#bigPauseSeconds = bigPauseSec;
    this.#tasks = tasks;
    this.#activeTask = null;
    this.init();
    
    // test
    this.proceedTask();
    this.#timer = null;
  }
  
  init() {
    // test
    if (!localStorage.getItem('pomidor')) {
      const pomidor = JSON.stringify({
        id: 2,
        name: 'Заплатить за квартиру',
        priority: 2,
        isActive: true,
        finishedPomidoro: 0,
      });
      localStorage.setItem('pomidor', pomidor);
    }
    
    this.#activeTask = JSON.parse(localStorage.getItem('pomidor'));
    
    //todo проверить работоспос-ть на морде когда она будет
    if (this.#activeTask) {
      this.#timer = new Timer(this.#activeTask, this.time);
    }
  }
  
  get time() {
    return {
      estimatedSeconds: this.#estimatedSeconds,
      pauseSeconds: this.#pauseSeconds,
      bigPauseSeconds: this.#bigPauseSeconds
    };
  }
  
  get taskList() {
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
  
  deactivateAllTasks() {
    for (const task of this.#tasks) {
      if (task.isActive) task.isActive = false;
    }
  }
  
  proceedTask() {
    if (this.#activeTask) {
      console.log(' this.#activeTask: ', this.#activeTask);
      console.log(' this.#activeTask.finishedPomidoroCounter: ', this.#activeTask.finishedPomidoro);
      
      this.restartTimer();
    } else {
      console.log(`Error. No active task available!`);
    }
  }
  
  restartTimer() {
    const timerPromise = this.#timer.startTimer();
    timerPromise.then((pomCounter) => {
      this.#activeTask.finishedPomidoro = pomCounter;
      localStorage.setItem('pomidor', JSON.stringify(this.#activeTask));
      this.restartTimer();
    });
  }
}
