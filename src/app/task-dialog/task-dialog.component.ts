import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Task } from "app/model/task";


@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {

  @ViewChild('childModal') public childModal: ModalDirective;



  constructor() { }

  public show(task:Task): void {
    this.childModal.show();
  }

  public cancel(): void {
    this.childModal.hide();
  }

}
