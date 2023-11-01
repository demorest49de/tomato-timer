import {Timer} from "./Timer.js";

export class Tomato {
    #estimatedTime;
    #pauseTime;
    #bigPauseTime;
    #tasks;
    #activeTask;
    
    constructor({
                    estimatedTime: estimatedTime = 0.25,
                    pauseTime: pauseTime = 0.25,
                    bigPauseTime: bigPauseTime = 0.25,
                    // estimatedTime: estimatedTime = 25,
                    // pauseTime: pauseTime = 5,
                    // bigPauseTime: bigPauseTime = 15,
                    tasks = []
                }) {
        this.#estimatedTime = estimatedTime;
        this.#pauseTime = pauseTime;
        this.#bigPauseTime = bigPauseTime;
        this.#tasks = tasks;
        // ?
        this.#activeTask = null;
        this.init();
        
        // test
        this.proceedTask();
    }
    
    init() {
        this.#activeTask = this.activeTask;
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
        this.untasksAllTasks();
        for (const task of this.#tasks) {
            if (task.id === id) {
                task.isActive = true;
                return;
            }
        }
    }
    
    increaseCounter(id) {
    
    }
    
    untasksAllTasks() {
        for (const task of this.#tasks) {
            if (task.isActive) task.isActive = false;
        }
    }
    
    proceedTask() {
        if (this.#activeTask) {
            const task = this.#activeTask;
            let remainingTime = task.remainingTime;
            
            switch (true) {
                case task.counter === 0:
                    remainingTime = this.#estimatedTime;
                    break;
                case task.counter % 4 === 0:
                    remainingTime = remainingTime ? remainingTime : this.#bigPauseTime;
                    break;
                case task.counter % 2 === 0:
                    remainingTime = remainingTime ? remainingTime : this.#bigPauseTime;
                    break;
                default:
                    remainingTime = remainingTime ? remainingTime : this.#estimatedTime;
                    break;
            }
            const timer = new Timer(task.name, task.counter, remainingTime);
            timer.startTimer();
            
        } else {
            console.log(`Error. No active task available!`);
        }
    }
}
