import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Task } from './../model/task'
import { RepositoryService } from './../service/repository.service'
import { TaskFormComponent } from "app/task-form/task-form.component";
import { EditAction } from "app/model/edit-action.enum";
import { TaskEdit } from "app/model/taskedit";
import { MdDialog } from "@angular/material";
import { TaskDialogComponent } from "app/task-dialog/task-dialog.component";

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  @Input() title: string;
  @Input() columnWidth: number;
  @ViewChild('taskDialog') public taskDialog: TaskDialogComponent;

  constructor(private _storage: RepositoryService, public dialog: MdDialog) {
  }

  ngOnInit() {

  }

  public acceptDrop(event) {
    let data: Task = <Task>event.dragData;
    data.stage = this.title;
    this._storage.addTask(data);
  }

  public onAdd() {
    this.taskDialog.onSuccess = (task) => {
      task.created = new Date().getTime();
      task.stage = this.title;
      this._storage.addTask(task);
    }
    this.taskDialog.add();
  }

  public onEdit(task: Task) {
    this.taskDialog.onSuccess = (res) => {
      task.title = res.title;
      task.description = res.description;
      this._storage.autosave();
    }
    this.taskDialog.edit(task);
  }


}
