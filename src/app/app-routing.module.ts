import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { ListComponent } from './components/list/list.component';
import { ToDo, todoFieldsMap } from './model/todo';
import { TodoService } from './services/todo/todo.service';

const routes: Routes = [
  {
    path: 'detail/:id',
    component: DetailComponent,
    pathMatch: 'full',
    resolve: {
      todo: (route: ActivatedRouteSnapshot) => {
        const id = route.paramMap.get('id') as string;
        return inject(TodoService).getTodo(id);
      },
    },
  },
  {
    path: 'detail',
    component: DetailComponent,
    pathMatch: 'full',
    resolve: {
      todo: () =>
        ({
          type: Object.keys(todoFieldsMap)[0],
          name: `New task`,
          fields: {},
        } as ToDo),
    },
  },
  {
    path: '**',
    component: ListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
