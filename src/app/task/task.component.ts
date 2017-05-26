import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Task } from './../model/task';
import { RepositoryService } from "app/service/repository.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;

  constructor(private _storage: RepositoryService, private _ngZone: NgZone) {
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

}
