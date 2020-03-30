import {UserData} from '../types/UserData.types';
import {EventObject} from 'xstate';

export interface UpdateMachineContext {
  userData: UserData;
  error: boolean;
  errorMsg: string;
}

export enum UpdateStates {
  fetch = 'fetch',
  edit = 'edit',
  pending = 'pending',
  done = 'done',
}

export interface UpdateMachineStates {
  states: {
    [UpdateStates.fetch]: {};
    [UpdateStates.edit]: {};
    [UpdateStates.pending]: {};
    [UpdateStates.done]: {};
  };
}

export enum UpdateEvents {
  NEXT = 'NEXT',
  ERROR = 'ERROR',
}

type EventTypesSchema = UpdateEvents.NEXT | UpdateEvents.ERROR;

export interface UpdateMachineEvents extends EventObject {
  type: EventTypesSchema;
}
