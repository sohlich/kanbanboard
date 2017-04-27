import { Component, OnInit,Input } from '@angular/core';
import { Task } from './../model/task'
import { RepositoryService } from './../service/repository.service'

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit {

  @Input() title: string;

  constructor(private _storage: RepositoryService) {
  }

  ngOnInit() {
    
  }

  public acceptDrop(event) {
    let data: Task = <Task>event.dragData;
    data.stage = this.title;
    this._storage.addTask(data);
  }

  


}
