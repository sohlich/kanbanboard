import { Injectable } from '@angular/core';
import { Task } from "app/model/task";
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Board } from "app/model/board";

declare var fs: any;
declare var electron: any;
declare var path: any;

@Injectable()
export class RepositoryService {

  _topFile: string;
  _boardFile: string;
  _tasks: Task[] = [];
  _boards: Board[] = [];
  _observableList: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  _observableBoards: BehaviorSubject<Board[]> = new BehaviorSubject([]);
  _observableCurrentBoard: BehaviorSubject<Board> = new BehaviorSubject(new Board());

  _appDataFolder: string;
  private _currentBoard: Board;


  constructor() {
    this._appDataFolder = electron.remote.app.getPath('userData');
    console.log("App Data: " + this._appDataFolder);


    this._topFile = path.join(this._appDataFolder, 'board_list.json');

    if (fs.existsSync(this._topFile)) {
      let t: string = fs.readFileSync(this._topFile, {
        encoding: 'utf8'
      });
      this._boards = <Board[]>JSON.parse(t);
      for (var idx = 0; idx < this._boards.length; idx++) {
        var b = this._boards[idx];
        if(b.default){
          console.log('Found default board: '+b.title );
          this.setCurrentBoard(b);
          break;
        }
      }
      if(this._currentBoard == null && this._boards.length > 0){
        this.setCurrentBoard(this._boards[0]);
      }else if(this._currentBoard == null){
        let n = new Board();
        n.title = ""
        this.setCurrentBoard(n);
      }
    }

    let dataPath = path.join(this._appDataFolder, 'data');
    if (!fs.existsSync(path.join(this._appDataFolder, 'data'))) {
      fs.mkdirSync(dataPath);
    }

  }

  setCurrentBoard(board: Board) {
    console.log("RepositoryService: setting current board: " + board);
    this._currentBoard = board;
    console.log("Loading board: "+JSON.stringify(board));
    this.loadBoardData(board.title);
    this._observableCurrentBoard.next(this._currentBoard);
  }

   getCurrentBoard():Board {
      return this._currentBoard;
  }

  addTask(task: Task) {
    this._tasks.push(task);
    this.refresh();
    this.autosave();
  }

  removeTask(task: Task) {
    var index = this._tasks.indexOf(task, 0);
    if (index > -1) {
      console.log('Found at index: ' + index);
      this._tasks.splice(index, 1);
    }
    this.refresh();
    this.autosave();
  }

  refresh() {
    this._observableList.next(this._tasks);
  }

  refreshBoards() {
    this._observableBoards.next(this._boards)
  }


  private loadBoardData(name: string) {
    let lowerName = 'board_'+name.toLowerCase()+'.json';
    this._boardFile = path.join(this._appDataFolder, 'data', lowerName);
    if (fs.existsSync(this._boardFile)) {
      let t: string = fs.readFileSync(this._boardFile, {
        encoding: 'utf8'
      });
      this._tasks = <Task[]>JSON.parse(t);
    }else{
      this._tasks = [];
    }
  }

   autosave(){
    fs.writeFileSync(this._boardFile, JSON.stringify(this._tasks));
  }

}
