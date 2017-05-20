import { NgModule, Pipe, Injectable, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from "app/model/task";

@Pipe({
  name: 'stageFilter',
  pure: false
})
@Injectable()
export class StageFilter implements PipeTransform {

  constructor() {
  }

  transform(items: Task[], stage: string): any {
    return items.filter(item => item.stage === stage);
  }
}

@Pipe({
  name: 'toUpper',
  pure: false
})
@Injectable()
export class UpperFilter implements PipeTransform {

  constructor() {
  }

  transform(name: string): any {
    if (name != null) { 
      return name.toUpperCase();
     } else {
      return '';
    };
  }
}


@NgModule({
  declarations: [
    StageFilter,
    UpperFilter
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StageFilter,
    UpperFilter
  ]
})
export class FilterModule { }
