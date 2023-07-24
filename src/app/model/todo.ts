export type ToDoType = 'wash-dishes' | 'vacuum-clean';

export interface ToDo {
  _id?: string;
  type: ToDoType;
  name: string;
  fields: { [key: string]: any };
}

export interface WashDishesFields {
  durationInHours: number;
}

export interface VacuumCleanFields {
  who: string;
  room: string;
}

export const todoFieldsMap: { [type in ToDoType]: { [key: string]: string } } =
  {
    ['wash-dishes']: { durationInHours: 'number' },
    ['vacuum-clean']: {
      who: 'string',
      room: 'string',
    },
  };
