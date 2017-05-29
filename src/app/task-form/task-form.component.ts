import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Task } from "app/model/task";
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { EditAction } from "app/model/edit-action.enum";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {


  private _task: Task;
  private _action: EditAction;
  title:string;

  constructor( @Inject(MD_DIALOG_DATA) private _content: any,
    private _dialogRef: MdDialogRef<TaskFormComponent>) {
    this._task = new Task();
    this._action = _content.action;
    if (_content.action === EditAction.EDIT) {
      this._task.title = _content.data.title;
      this._task.description = _content.data.description;
    }
  }

  ngOnInit() {
  }

  onOK() {
    if (this._content.action === EditAction.EDIT) {
      this._content.data.title = this._task.title;
      this._content.data.description = this._task.description;
    } else {
      this._content.data
        = this._task;
    }
    this._dialogRef.close('OK')
  }

  onCancel() {
    this._dialogRef.close('Cancel')
  }

}
