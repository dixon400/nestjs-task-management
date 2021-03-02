import { Query } from "@nestjs/common";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from "@nestjs/common";
import {throws} from "assert";
import {CreateTaskDto} from "./dtos/create_task.dto";
import {GetTasksFilterDto} from "./dtos/get-tasks-filter.dto";
import {Task, TaskStatus} from "./task.model";
import {TasksService} from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService : TasksService) {}

  @Get()
  getAllTasks(@Query()filterDto : GetTasksFilterDto): Task[]{
    return Object.keys(filterDto).length
      ? this.tasksService.getTasksWithFIlters(filterDto)
      : this.tasksService.getAllTasks();
  }
  @Get("/:id")
  getTaskById(@Param("id")id : string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createtask(@Body()createTaskDto : CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Patch("/:id/status")
  updateTask(@Param("id")id : string, @Body("status")status : TaskStatus): Task {
    return this.tasksService.updateTask(id, status);
  }

  @Delete("/:id")
  deleteTaskById(@Param("id")id : string): Task[]{
    return this.tasksService.deleteTask(id);
  }
}
