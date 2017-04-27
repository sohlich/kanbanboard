import { Injectable } from '@angular/core';
import { Task } from "app/model/task";
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class RepositoryService {

  _tasks: Task[] = [];
  _observableList: BehaviorSubject<Task[]> = new BehaviorSubject([]);


  constructor() {}


  addTask(task: Task) {
    this._tasks.push(task);
    this.refresh();
  }

  removeTask(task: Task) {
    var index = this._tasks.indexOf(task, 0);
    if (index > -1) {
      console.log('Found at index: ' + index);
      this._tasks.splice(index, 1);
    }
    this.refresh();
  }

  private refresh() {
    console.log(this._tasks);
    this._observableList.next(this._tasks);
  }


}
