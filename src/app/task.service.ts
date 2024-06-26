import { Injectable } from '@angular/core';
import { Task } from './components/task/types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}
  allTasks: Task[] = [];

  getTasks(): Task[] {
    return this.allTasks && this.allTasks.length >= 9
      ? this.allTasks.slice(0, 10)
      : this.allTasks;
  }

  setTasks(tasks: Task[]): void {
    this.allTasks = tasks;
  }

  fetchTask(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(apiUrl).pipe();
  }

  getTaskById(id: number): Task | undefined {
    return this.allTasks.find((e) => e.id === id);
  }

  updateTask(task: Task): void {
    const targetIndex = this.allTasks.findIndex((e) => e.id === task.id);
    if (targetIndex >= 0) {
      this.allTasks[targetIndex] = { ...task };
    }
  }
}

const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
