import { Component, OnInit,Input } from '@angular/core';
import { Task } from './../model/task';
import { RepositoryService } from "app/service/repository.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task : Task;

  constructor(private _storage:RepositoryService) { 
  }

  ngOnInit() {
  }

  onDrag(event){
    this._storage.removeTask(this.task);
  }

  onDelete(){
    this._storage.removeTask(this.task);
  }

}
