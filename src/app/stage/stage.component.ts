import { Component, OnInit, Input } from '@angular/core';
import { Task } from './../model/task'
import { RepositoryService } from './../service/repository.service'
import { TaskFormComponent } from "app/task-form/task-form.component";
import { EditAction } from "app/model/edit-action.enum";
import { TaskEdit } from "app/model/taskedit";
import { MdDialog } from "@angular/material";

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  @Input() title: string;
  @Input() columnWidth: number;

  constructor(private _storage: RepositoryService,public dialog: MdDialog) {
  }

  ngOnInit() {

  }

  public acceptDrop(event) {
    let data: Task = <Task>event.dragData;
    data.stage = this.title;
    this._storage.addTask(data);
  }


  public onAddTask(event: any) {
    console.log("Adding task.");
    
    let dialogRef = this.dialog.open(TaskFormComponent, {
      width: '50vw',
      height: '25vh',
      data: new TaskEdit(EditAction.NEW, null)
    });

    let obs = dialogRef.afterClosed().subscribe(result => {
      if (result !== "OK") { return; }
      let task = dialogRef._containerInstance.dialogConfig.data.data;
      task.created = new Date().getTime();
      task.stage = this.title;
      this._storage.addTask(task);
      obs.unsubscribe();
    });
  }


}
