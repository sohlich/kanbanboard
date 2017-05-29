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

@Pipe({
  name: 'toLower',
  pure: false
})
@Injectable()
export class LowerFilter implements PipeTransform {

  constructor() {
  }

  transform(name: string): any {
    if (name != null) { 
      return name.toLowerCase();
     } else {
      return '';
    };
  }
}




@NgModule({
  declarations: [
    StageFilter,
    UpperFilter,
    LowerFilter
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StageFilter,
    UpperFilter,
    LowerFilter
  ]
})
export class FilterModule { }
