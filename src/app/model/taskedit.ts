import { Task } from "app/model/task";
import { EditAction } from "app/model/edit-action.enum";

export class TaskEdit {
    action: EditAction;
    data: Task;

    constructor(action: EditAction, task: Task) {
        this.action = action;
        this.data = task;
    }
}
