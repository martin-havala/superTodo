import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, map, tap } from 'rxjs';
import { ToDo, todoFieldsMap } from '../../../app/model/todo';
import { TodoService } from '../../../app/services/todo/todo.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
})
export class DetailComponent {
  todo!: ToDo;
  formFieldsGroup!: FormGroup;
  formFields: { key: string; type: string }[]=[];
  formCtrlName!: FormControl;
  formCtrlType!: FormControl;
  formTypes = Object.keys(todoFieldsMap);
  loading$ = this.todoService.loading$;

  constructor(
    route: ActivatedRoute,
    private todoService: TodoService,
    private router: Router
  ) {
    route.data
      .pipe(
        first(),
        map(({ todo }) => todo as ToDo)
      )
      .subscribe((todo) => {
        this.todo = todo;
        this.formCtrlName = new FormControl<string>(todo.name, [
          Validators.required,
        ]);

        if (!todo.type) {
          return;
        }

        if (!todo._id) {
          this.formCtrlType = new FormControl(this.formTypes[0]);
          this.formCtrlType.valueChanges
            .pipe(filter(Boolean))
            .subscribe((t) => {
              this.todo.type = t;
              this.recreateForm();
            });
        }
      });

    this.recreateForm();
  }

  recreateForm() {
    this.formFieldsGroup = new FormGroup({});

    if (!this.todo) {
      return;
    }
    const params = todoFieldsMap[this.todo.type];
    this.formFields = Object.keys(params).map((key) => ({
      key,
      type: params[key],
    }));

    this.formFields.forEach(({ key, type }) => {
      switch (type) {
        case 'string':
          this.formFieldsGroup.addControl(
            key,
            new FormControl<string>(this.todo.fields[key] ?? '', [
              Validators.required,
            ])
          );
          break;
        case 'number':
          this.formFieldsGroup.addControl(
            key,
            new FormControl<number>(this.todo.fields[key] ?? '', [
              Validators.required,
            ])
          );
          break;
      }
      this.formFieldsGroup.addControl(key, new UntypedFormControl());
    });
  }

  saveForm() {
    this.todoService
      .insertUpdate({
        ...this.todo,
        name: this.formCtrlName.value,
        fields: this.formFieldsGroup.value,
      })
      .pipe(tap(() => this.router.navigateByUrl('/list')))
      .subscribe();
  }
}
