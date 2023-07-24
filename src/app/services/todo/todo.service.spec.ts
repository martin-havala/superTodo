import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator/jest';
import { ToDo } from 'src/app/model/todo';
import { environment } from '../../../app/environments/environment';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let spectator: SpectatorHttp<TodoService>;
  const createService = createHttpFactory(TodoService);

  beforeEach(() => (spectator = createService()));

  it('should read tasks on init', () => {
    expect(spectator.service).toBeTruthy();
    spectator.service.refreshTodos().subscribe();
    spectator.expectOne(`${environment.apiUrl}/tasks`, HttpMethod.GET);
  });

  test('insertUpdate', () => {
    const td: ToDo = {
      name: 'test',
      type: 'vacuum-clean',
      fields: [],
    };
    const td2 = { ...td, _id: 'id' };

    spectator.service.insertUpdate(td).subscribe();
    spectator.expectOne(
      `${environment.apiUrl}/tasks`,
      HttpMethod.POST
    );

    spectator.service.insertUpdate(td2).subscribe();
    spectator.expectOne(
      `${environment.apiUrl}/tasks/${td2._id}`,
      HttpMethod.PUT
    );
  });

  test('addTodo', () => {
    const td: ToDo = {
      name: 'test',
      type: 'vacuum-clean',
      fields: [],
    };
    spectator.service.addTodo(td).subscribe();
    spectator.expectOne(`${environment.apiUrl}/tasks`, HttpMethod.POST);
  });

  test('getTodo', () => {
    const todoId = 'id';
    spectator.service.getTodo(todoId).subscribe();
    spectator.expectOne(
      `${environment.apiUrl}/tasks/${todoId}`,
      HttpMethod.GET
    );
  });

  test('deleteTodo', () => {
    const todoId = 'id';
    spectator.service.deleteTodo(todoId).subscribe();
    spectator.expectOne(
      `${environment.apiUrl}/tasks/${todoId}`,
      HttpMethod.DELETE
    );
  });

  test('updateTodo', () => {
    const td: ToDo = {
      _id: 'id',
      name: 'test',
      type: 'vacuum-clean',
      fields: [],
    };
    spectator.service.updateTodo(td).subscribe();
    spectator.expectOne(
      `${environment.apiUrl}/tasks/${td._id}`,
      HttpMethod.PUT
    );
  });
});
