import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import {MaterialModule} from '@angular/material';
import { StageComponent } from './stage/stage.component';
import { TaskComponent } from './task/task.component';
import {DndModule} from 'ng2-dnd';
import { RepositoryService } from './service/repository.service'
import { FilterModule } from "app/modules/filter.module";
import { TaskFormComponent } from './task-form/task-form.component';

declare var electron: any; 

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    StageComponent,
    TaskComponent,
    TaskFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    DndModule.forRoot(),
    FilterModule
  ],
  providers: [RepositoryService],
  bootstrap: [AppComponent],
  entryComponents: [TaskFormComponent]
})
export class AppModule { }
