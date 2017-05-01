import { Injectable } from '@angular/core';
import { Task } from "app/model/task";
import { Observable, BehaviorSubject, Subject } from 'rxjs';

declare var fs: any;
declare var electron: any;
declare var path: any;

@Injectable()
export class RepositoryService  {



  _dataFolder: string;
  _tasks: Task[] = [];
  _observableList: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  _appDataFolder: string;


  constructor() {
    this._appDataFolder = electron.remote.app.getPath('userData');
    this._dataFolder = path.join(this._appDataFolder, 'data', 'board.json');

    let dataPath = path.join(this._appDataFolder, 'data');
    if (!fs.existsSync(path.join(this._appDataFolder, 'data'))) {
      fs.mkdirSync(dataPath);
    }

    if (fs.existsSync(this._dataFolder)) {
      let t: string = fs.readFileSync(this._dataFolder, {
        encoding: 'utf8'
      });
      this._tasks = <Task[]>JSON.parse(t);
    }
  }


  addTask(task: Task) {
    this._tasks.push(task);
    this.refresh();
    fs.writeFile(path.join(this._dataFolder), JSON.stringify(this._tasks), (err) => {
      if (err) {
        console.log("An error ocurred creating the file " + err.message);
      }
    });
  }

  removeTask(task: Task) {
    var index = this._tasks.indexOf(task, 0);
    if (index > -1) {
      console.log('Found at index: ' + index);
      this._tasks.splice(index, 1);
    }
    this.refresh();
  }

  refresh() {
    this._observableList.next(this._tasks);
  }


}
