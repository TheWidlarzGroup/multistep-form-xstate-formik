import {UserData} from '../types/UserData.types';
import {EventObject} from 'xstate';

export interface UserDataMachineCOntext {
  userData: UserData;
  error: boolean;
  errorMsg: string;
}

export enum UserDataStates {
  init = 'init',
  basic = 'basic',
  address = 'address',
  payment = 'payment',
  complete = 'complete',
}

export interface UserDataMachineStates {
  states: {
    [UserDataStates.init]: {};
    [UserDataStates.basic]: {};
    [UserDataStates.address]: {};
    [UserDataStates.payment]: {};
    [UserDataStates.complete]: {};
  };
}

export enum UserDataEvents {
  BASIC = 'BASIC',
  ADDRESS = 'ADDRESS',
  PAYMENT = 'PAYMENT',
  NEXT = 'NEXT',
  BACK = 'BACK',
}

type EventTypesSchema =
  | UserDataEvents.BASIC
  | UserDataEvents.ADDRESS
  | UserDataEvents.PAYMENT
  | UserDataEvents.NEXT
  | UserDataEvents.BACK;

export interface UserDataMachineEvents extends EventObject {
  type: EventTypesSchema;
}
