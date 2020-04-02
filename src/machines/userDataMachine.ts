import {Machine} from 'xstate';
import {
  UserDataMachineContext,
  UserDataMachineStates,
  UserDataMachineEvents,
  UserDataStates,
  UserDataEvents,
} from './userDataMachine.types';

export const userDataMachine = Machine<
  UserDataMachineContext,
  UserDataMachineStates,
  UserDataMachineEvents
>({
  id: 'userDataMachine',
  initial: UserDataStates.init,
  context: {
    error: false,
    errorMsg: '',
    userData: null,
  },
  states: {
    [UserDataStates.init]: {
      on: {
        [UserDataEvents.BASIC]: {
          target: UserDataStates.basic,
        },
        [UserDataEvents.ADDRESS]: {
          target: UserDataStates.address,
        },
        [UserDataEvents.PAYMENT]: {
          target: UserDataStates.payment,
        },
      },
    },
    [UserDataStates.basic]: {
      on: {
        [UserDataEvents.NEXT]: {
          target: UserDataStates.address,
        },
      },
    },
    [UserDataStates.address]: {
      on: {
        [UserDataEvents.NEXT]: {
          target: UserDataStates.payment,
        },
        [UserDataEvents.BACK]: {
          target: UserDataStates.basic,
        },
      },
    },
    [UserDataStates.payment]: {
      on: {
        [UserDataEvents.NEXT]: {
          target: UserDataStates.complete,
        },
        [UserDataEvents.BACK]: {
          target: UserDataStates.address,
        },
      },
    },
    [UserDataStates.complete]: {
      on: {
        [UserDataEvents.BACK]: {
          target: UserDataStates.payment,
        },
      },
    },
  },
});
