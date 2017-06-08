import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Task } from "app/model/task";


type CloseCallback = (n: Task) => any;

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {

  @ViewChild('childModal') public childModal: ModalDirective;
  task: Task = new Task();
  onSuccess: CloseCallback;

  constructor() { }

  public add(): void {
    this.open(new Task());
  }

  public edit(task: Task) {
    this.open(Task.Copy(task));
  }


  private open(task: Task) {
    this.task = task;
    this.childModal.show();
  }


  public cancel(): void {
    this.childModal.hide();
  }

  public ok():void {
    this.childModal.hide();
    this.onSuccess(this.task);
  }

}
