import {
  createRoutingFactory,
  mockProvider
} from '@ngneat/spectator/jest';

import { ActivatedRoute, Router } from '@angular/router';
import { SpectatorRouting } from '@ngneat/spectator/jest';
import { BehaviorSubject, of } from 'rxjs';
import { TodoService } from '../../services/todo/todo.service';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let spectator: SpectatorRouting<ListComponent>;
  const createComponent = createRoutingFactory(ListComponent);

  const loading$ = new BehaviorSubject(false);
  const todos$ = new BehaviorSubject([]);
  beforeEach(
    () =>
      (spectator = createComponent({
        providers: [
          mockProvider(ActivatedRoute),
          mockProvider(TodoService, {
            loading$,
            todos$,
            refreshTodos: () => of(),
          }),
          mockProvider(Router),
        ],
      }))
  );

  it('should be alive', () => {
    expect(spectator).toBeTruthy();
  });
});
