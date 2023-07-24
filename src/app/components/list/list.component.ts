import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ToDo } from '../../../app/model/todo';
import { TodoService } from '../../../app/services/todo/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  animations: [
    trigger('insertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ListComponent {
  todos$: Observable<ToDo[]> = from(this.todoService.todos$);
  loaded$ = this.todoService.loaded$;
  constructor(private todoService: TodoService) {
    this.todoService.refreshTodos().subscribe();
  }

  deleteTodo(todoId?: string) {
    todoId && this.todoService.deleteTodo(todoId).subscribe();
  }
  trackById(rowIndex: number, todo: ToDo) {
    return todo._id;
  }
}
