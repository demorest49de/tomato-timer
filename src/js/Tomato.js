import {Timer} from "./Timer.js";

export class Tomato {
    #estimatedTime;
    #pauseTime;
    #bigPauseTime;
    #tasks;
    #activeTask;
    
    constructor({
                    estimatedTime: estimatedTime = 25,
                    pauseTime: pauseTime = 5,
                    bigPauseTime: bigPauseTime = 15,
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
        this.startTask();
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
    
    startTask() {
        if (this.#activeTask) {
            const task = this.#activeTask;
            const timer = new Timer(task.name, task.counter);
            
        } else {
            console.log(`Error. No active task available!`);
        }
        
        //     if (isFinished && timer.counter % 3 === 0) {
        //         timer.startTimer(this.#bigPauseTime);
        //     }
    }
}
