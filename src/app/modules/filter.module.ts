import { NgModule, Pipe, Injectable, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from "app/model/task";

@Pipe({
  name: 'stageFilter',
  pure: false
})
@Injectable()
export class StageFilter implements PipeTransform {

  constructor(){
  }

  transform(items: Task[],stage:string): any {
    return items.filter(item => item.stage === stage);
  }
}


@NgModule({
  declarations: [
    StageFilter
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StageFilter
  ]
})
export class FilterModule { }
