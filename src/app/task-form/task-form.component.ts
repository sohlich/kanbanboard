import { Component, OnInit } from '@angular/core';
import { Task } from "app/model/task";
import { MdDialogRef } from "@angular/material";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  private _task: Task;

  constructor(private _dialogRef: MdDialogRef<TaskFormComponent>) { 
    this._task = <Task> _dialogRef.config.data;
  }

  ngOnInit() {
  }

}
