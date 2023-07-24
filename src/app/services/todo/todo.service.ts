import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import { environment } from '../../..//app/environments/environment';
import { ToDo } from '../../..//app/model/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  readonly tasksURL = `${environment.apiUrl}/tasks`;
  private _todos: ToDo[] = [];
  todos$ = new BehaviorSubject(this._todos);
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  private setTodos(todos: ToDo[]) {
    this._todos = todos;
    this.todos$.next(todos);
  }

  insertUpdate(todo: ToDo) {
    if (todo._id) {
      return this.updateTodo(todo);
    } else {
      return this.addTodo(todo);
    }
  }

  addTodo(todo: ToDo) {
    this.loading$.next(true);
    return this.http.post<ToDo>(`${this.tasksURL}`, todo).pipe(
      tap((resTodo) => {
        this.setTodos([...this._todos, resTodo]);
      }),
      finalize(() => this.loading$.next(false))
    );
  }

  deleteTodo(todoId: string) {
    this.loading$.next(true);
    return this.http.delete<ToDo>(`${this.tasksURL}/${todoId}`).pipe(
      tap(() => {
        this.setTodos(this._todos.filter((td) => td._id != todoId));
      }),
      finalize(() => this.loading$.next(false))
    );
  }

  updateTodo(todo: ToDo) {
    this.loading$.next(true);
    return this.http.put<ToDo>(`${this.tasksURL}/${todo._id}`, todo).pipe(
      tap((resTodo) => {
        const newTodos = this._todos.map((td) =>
          td._id == resTodo._id ? todo : td
        );
        this.setTodos(newTodos);
      }),
      finalize(() => this.loading$.next(false))
    );
  }

  getTodo(todoId: string) {
    this.loading$.next(true);
    return this.http
      .get<ToDo[]>(`${this.tasksURL}/${todoId}`)
      .pipe(finalize(() => this.loading$.next(false)));
  }

  refreshTodos() {
    this.loading$.next(true);
    return this.http.get<ToDo[]>(this.tasksURL).pipe(
      tap((todos) => this.setTodos(todos)),
      finalize(() => {
        this.loading$.next(false);
        this.loaded$.next(true);
      })
    );
  }
}
