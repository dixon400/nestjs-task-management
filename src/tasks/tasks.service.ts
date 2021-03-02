import {Injectable} from "@nestjs/common";
import {Task, TaskStatus} from "./task.model";
import {v1 as uuid} from "uuid";
import {CreateTaskDto} from "./dtos/create_task.dto";
import {GetTasksFilterDto} from "./dtos/get-tasks-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[]{
    return this.tasks;
  }

  getTasksWithFIlters(filterDto : GetTasksFilterDto): Task[]{
    const {status, search} = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => task.title.includes(search) || task.description.includes(search));
    }
    return tasks;
  }

  getTaskById(id): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto : CreateTaskDto) {
    const {title, description} = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id : string, status : TaskStatus): Task {
    let task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id): Task[]{
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks;
  }
}
