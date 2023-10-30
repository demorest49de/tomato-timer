import {Timer} from "./Timer.js";

export class Tomato {
    #estimated;
    #paused;
    #bigPaused;
    #tasks;
    #activeTask;
    
    constructor({estimated = 25, paused = 5, bigPaused = 15, tasks = []}) {
        this.#estimated = estimated;
        this.#paused = paused;
        this.#bigPaused = bigPaused;
        this.#tasks = tasks;
        this.#activeTask = null;
        this.init();
    }
    
    init() {
        this.startTask();
    }
    
    get time() {
        return {estimated: this.#estimated, paused: this.#paused, bigPaused: this.#bigPaused};
    }
    
    get tasks() {
        return this.#tasks;
    }
    
    get activeTask() {
        return this.#activeTask;
    }
    
    addTask(task) {
        this.#tasks.push(task);
    }
    
    activateTask(id) {
        console.log(' получить задачу из this.#tasks: по id и пометить ее как активную???');
        
    }
    
    startTask() {
        const timer = new Timer("name", 1);
        timer.startTimer(1);
        // if (this.#activeTask) {
        // } else {
        //     console.log(`Error. No active task available!`);
        // }
    }
}
