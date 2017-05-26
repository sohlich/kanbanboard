import { Component, OnInit,Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from "@angular/material";
import { Board } from "app/model/board";

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css']
})
export class BoardFormComponent implements OnInit {

  _board: Board;
  stageName:string;

constructor(@Inject(MD_DIALOG_DATA) data: any, private _dialogRef: MdDialogRef<BoardFormComponent>) { 
    this._board = <Board> data;
  }

  ngOnInit() {
  }

  addStage() {
    this._board.stages.push(this.stageName);
  }

  okClick() {
    this._dialogRef.close('OK');
  }

}
