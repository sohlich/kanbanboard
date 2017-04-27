import { Component, OnInit, Input } from '@angular/core';
import { Task } from "app/model/task";
import { RepositoryService } from "app/service/repository.service";
import { MdDialog } from "@angular/material";
import { TaskFormComponent } from "app/task-form/task-form.component";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() title: string = "Kanban board"
  stages: string[] = [];

  constructor(private _storage: RepositoryService, public dialog: MdDialog) {
    this.stages[0] = 'TODO';
    this.stages[1] = 'In progress';
    this.stages[2] = 'Done';
  }

  ngOnInit() {
  }

  onAddTask(event: any) {

    let dialogRef = this.dialog.open(TaskFormComponent, {
      height: '400px',
      width: '600px',
      data: new Task()
    });

    let obs = dialogRef.afterClosed().subscribe(result => {
      if (result !== "OK") {return;}
      let task = dialogRef.config.data;
      task.created = new Date().getTime();
      task.stage = this.stages[0];
      this._storage.addTask(task);
      obs.unsubscribe();
    });

    // if (this.stages.length == 0) {
    //   return;
    // }

    // let task = new Task();
    // task.title = "Test";
    // task.description = "Description";
    // task.created = new Date().getTime();
    // task.stage = this.stages[0];
    // this._storage.addTask(task);
  }




}
