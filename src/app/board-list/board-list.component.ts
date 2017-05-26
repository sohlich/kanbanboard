import { Component, OnInit } from '@angular/core';
import { RepositoryService } from "app/service/repository.service";
import { Router } from "@angular/router";
import { Board } from "app/model/board";
import { MdDialog } from "@angular/material";
import { BoardFormComponent } from "app/board-form/board-form.component";

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {

  private selected: string;

  constructor(private _storage: RepositoryService,public dialog: MdDialog) { }

  ngOnInit() {
    this._storage.refreshBoards();
  }

  toBoard(board: Board){
    this.selected = board.title;
    this._storage.setCurrentBoard(board);
    this._storage.refresh();
  }

  addBoard(){
     let dialogRef = this.dialog.open(BoardFormComponent, {
      width: '50vw',
      height: '25vh',
      data: new Board()
    });

    let obs = dialogRef.afterClosed().subscribe(result => {
      if (result !== "OK") { return; }
      let board = dialogRef._containerInstance.dialogConfig.data;
      this._storage.addBoard(board);
      obs.unsubscribe();
    });
  }

}
