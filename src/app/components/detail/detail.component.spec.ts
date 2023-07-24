import {
  Spectator,
  createRoutingFactory,
  mockProvider
} from '@ngneat/spectator/jest';

import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { ToDo } from '../../../app/model/todo';
import { CamelToNormalPipe } from '../../../app/pipes/camel-to-normal.pipe';
import { DashToNormalPipe } from '../../../app/pipes/dash-to-normal.pipe';
import { TodoService } from '../../services/todo/todo.service';
import { DetailComponent } from './detail.component';

describe('DetailComponent', () => {
  let spectator: Spectator<DetailComponent>;
  const loading$ = new BehaviorSubject(false);

  const createComponent = createRoutingFactory({
    component: DetailComponent,
    declarations:[
      DashToNormalPipe,
      CamelToNormalPipe
    ],
    providers: [
      mockProvider(ActivatedRoute, {
        data: of({
          todo: {
            id: 'test-id',
            fields: [],
            name: 'test-name',
            type: 'vacuum-clean',
          } as ToDo,
        }),
      }),
      mockProvider(TodoService, { loading$ }),
      mockProvider(Router, {}),
    ],
  });

  beforeEach(() => (spectator = createComponent({})));

  it('should be alive', () => {
    expect(spectator).toBeTruthy();
  });

  // it('should set the class name according to the [className] input', () => {
  //   spectator.setInput('className', 'danger');
  //   expect(spectator.query('button')).toHaveClass('danger');
  //   expect(spectator.query('button')).not.toHaveClass('success');
  // });
});
