import { Component, OnInit, Input } from '@angular/core';
import { Task } from "app/model/task";
import { RepositoryService } from "app/service/repository.service";
import { MdDialog } from "@angular/material";
import { TaskFormComponent } from "app/task-form/task-form.component";
import { Board } from "app/model/board";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: Board;

  constructor(private _storage: RepositoryService, public dialog: MdDialog) {
    this.board = _storage.getCurrentBoard();
  }

  ngOnInit() {
    this._storage._observableCurrentBoard.subscribe(res =>{
      this.board = res;
    });
    this._storage.refresh();
  }

  onAddTask(event: any) {

    let dialogRef = this.dialog.open(TaskFormComponent, {
      width: '50vw',
      height: '25vh',
      data: new Task()
    });

    let obs = dialogRef.afterClosed().subscribe(result => {
      if (result !== "OK") { return; }
      let task = dialogRef._containerInstance.dialogConfig.data;
      task.created = new Date().getTime();
      task.stage = this.board.stages[0];
      this._storage.addTask(task);
      obs.unsubscribe();
    });
  }




}
