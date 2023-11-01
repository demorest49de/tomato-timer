import {Timer} from "./Timer.js";

export class Tomato {
    #estimatedTime;
    #pauseTime;
    #bigPauseTime;
    #tasks;
    #activeTask;
    
    //test
    #secondsMin = 0.05;
    
    constructor({
                    estimatedTime: estimatedTime = 25 * this.#secondsMin,
                    pauseTime: pauseTime = 5 * this.#secondsMin,
                    bigPauseTime: bigPauseTime = 15 * this.#secondsMin,
                    tasks = []
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
        //test
        if (!localStorage.getItem('pomidor')) {
            const pomidor = JSON.stringify({
                id: 2,
                name: 'Заплатить за квартиру',
                priority: 2,
                isActive: true,
                finishedTasksCounter: 0,
                counter: 1,
                remainingTime: 5,
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
        //test
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
            case counter === 1:
                console.log(`estimatedTime - 25`);
                return remainingTime = remainingTime ? remainingTime : estimatedTime;
            case counter % 4 === 0:
                console.log(`bigPauseTime - 15`);
                return remainingTime = remainingTime ? remainingTime : bigPauseTime;
            case counter % 2 === 0:
                console.log(`pauseTime - 5`);
                return remainingTime = remainingTime ? remainingTime : pauseTime;
            default:
                console.log(`estimatedTime - 25 or unfinished time`);
                return remainingTime = remainingTime ? remainingTime : estimatedTime;
        }
    }
    
    proceedTask() {
        if (this.#activeTask) {
            const task = this.#activeTask;
            let remainingTime = task.remainingTime;
            
            remainingTime = this.pomidorType(remainingTime, task.counter);
            
            const timer = new Timer(task.name, task.counter, remainingTime);
            console.log(' this.#activeTask: ', this.#activeTask);
            const timerPromise = timer.startTimer();
            timerPromise.then(counter => {
                task.counter = counter;
                if (counter % 2 !== 0) {
                    task.finishedTasksCounter += 1;
                }
                this.increaseCounter(task.id);
                console.log(' this.#activeTask: ', this.#activeTask);
                
                //test
                localStorage.setItem('pomidor', JSON.stringify(this.#activeTask));
            });
        } else {
            console.log(`Error. No active task available!`);
        }
    }
}
