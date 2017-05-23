import {Inject} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Task } from "app/model/task";
import { MdDialogRef,MD_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  private _task: Task;

  constructor(@Inject(MD_DIALOG_DATA) data: any) { 
    this._task = <Task> data;
  }

  ngOnInit() {
  }

}
