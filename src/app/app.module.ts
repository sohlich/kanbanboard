import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import {MaterialModule} from '@angular/material';
import { StageComponent } from './stage/stage.component';
import { TaskComponent } from './task/task.component';
import {DndModule} from 'ng2-dnd';
import { RepositoryService } from './service/repository.service'
import { FilterModule } from "app/modules/filter.module";
import { TaskFormComponent } from './task-form/task-form.component';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardFormComponent } from './board-form/board-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';

const appRoutes: Routes = [
  { path: 'board', component: BoardComponent },
  { path: '**', component: BoardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    StageComponent,
    TaskComponent,
    TaskFormComponent,
    BoardListComponent,
    BoardFormComponent,
    TaskDialogComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    DndModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(appRoutes,{ enableTracing: true }),
    FilterModule
  ],
  providers: [RepositoryService],
  bootstrap: [AppComponent],
  entryComponents: [TaskFormComponent,BoardFormComponent]
})
export class AppModule { }
