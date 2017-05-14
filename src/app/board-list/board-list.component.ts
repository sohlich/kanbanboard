import { Component, OnInit } from '@angular/core';
import { RepositoryService } from "app/service/repository.service";
import { Router } from "@angular/router";
import { Board } from "app/model/board";

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {

  constructor(private _storage: RepositoryService,private _router: Router) { }

  ngOnInit() {
    this._storage.refreshBoards();
  }

  toBoard(board: Board){
    console.log('Going to board: '+board);
    this._storage.setCurrentBoard(board);
    this._router.navigate(['/board']);
  }

}
