import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Task } from './../model/task';
import { RepositoryService } from "app/service/repository.service";
import { TaskFormComponent } from "app/task-form/task-form.component";
import { MdDialog } from "@angular/material";
import { TaskEdit } from "app/model/taskedit";
import { EditAction } from "app/model/edit-action.enum";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;

  constructor(private _storage: RepositoryService,
    private _ngZone: NgZone,
    public dialog: MdDialog) {
  }

  ngOnInit() {
  }

  onDrag(event) {
    // Hack to make the component disappear from original
    // stage. 
    this._ngZone.runOutsideAngular(() => {
      this._storage.removeTask(this.task);
      this._ngZone.run(() => { });
    })

  }

  onDelete() {
    this._storage.removeTask(this.task);
    this._storage.autosave();
  }

  onEdit() {
    let dialogRef = this.dialog.open(TaskFormComponent, {
      width: '50vw',
      height: '25vh',
      data: new TaskEdit(EditAction.EDIT,this.task)
    });

    let obs = dialogRef.afterClosed().subscribe(result => {
      if (result !== "OK") { return; }
      this._storage.autosave();
      obs.unsubscribe();
    });


  }

}
