import { Component, OnInit, Input } from '@angular/core';
import { Task } from "app/model/task";
import { RepositoryService } from "app/service/repository.service";
import { MdDialog } from "@angular/material";
import { TaskFormComponent } from "app/task-form/task-form.component";
import { Board } from "app/model/board";
import { TaskEdit } from "app/model/taskedit";
import { EditAction } from "app/model/edit-action.enum";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: Board;

  constructor(private _storage: RepositoryService) {
    this.board = _storage.getCurrentBoard();
  }

  ngOnInit() {
    this._storage._observableCurrentBoard.subscribe(res =>{
      this.board = res;
    });
    this._storage.refresh();
  }

  




}
