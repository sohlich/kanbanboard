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
  inputs = [{ value: "stage name" }];

constructor(@Inject(MD_DIALOG_DATA) data: any, private _dialogRef: MdDialogRef<BoardFormComponent>) { 
    this._board = <Board> data;
  }

  ngOnInit() {
  }

  addStage() {
    this.inputs.push({ "value": '' });
  }

  okClick() {
    this._board.stages = [];
    this.inputs.forEach(val => {
      this._board.stages.push(val.value);
    });
    this._dialogRef.close('OK');
  }

}
