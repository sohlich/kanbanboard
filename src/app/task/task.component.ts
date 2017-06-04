import { Component, OnInit, Input, NgZone, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';
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
export class TaskComponent {


  @Input() task: Task;
  @Output() edit = new EventEmitter();

  public showButtons = false;


  constructor(private _storage: RepositoryService,
    private _ngZone: NgZone,
    public dialog: MdDialog) {
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
    this.edit.emit(this.task);
  }

  @HostListener('mouseover')
  onMouseOver() {
    this.showButtons = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.showButtons = false;
  }

}
