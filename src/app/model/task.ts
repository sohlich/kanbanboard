
export class Task {
    created: number;
    title: string;
    description: string;
    stage: string;

    static Copy(task: Task): Task {
        let t = new Task();
        t.title = task.title;
        t.description = task.description;
        t.stage = task.stage;
        t.created = task.created;
        return t;
    }

}