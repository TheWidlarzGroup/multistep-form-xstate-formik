import {Machine, assign} from 'xstate';
import {
  UpdateMachineContext,
  UpdateMachineStates,
  UpdateMachineEvents,
  UpdateStates,
  UpdateEvents,
} from './updateMachine.types';
import {UserData} from 'src/types/UserData.types';
import {updateUser, getUser} from '../data/Api';

export const updateMachine = Machine<
  UpdateMachineContext,
  UpdateMachineStates,
  UpdateMachineEvents
>({
  id: 'updateMachine',
  initial: UpdateStates.fetch,
  context: {
    error: false,
    errorMsg: '',
    userData: null,
  },
  states: {
    [UpdateStates.fetch]: {
      on: {
        [UpdateEvents.NEXT]: {
          target: UpdateStates.edit,
          actions: assign({
            error: _ => false,
            errorMsg: _ => '',
            userData: (_, {userData}) => userData,
          }),
        },
        [UpdateEvents.ERROR]: {
          target: UpdateStates.edit,
          actions: assign({
            error: _ => true,
            errorMsg: _ => 'Error',
          }),
        },
      },
      invoke: {
        src: ({userData}) => async cb => {
          try {
            if (userData) {
              const response = await getUser(userData);

              cb({
                type: UpdateEvents.NEXT,
                userData: response,
              });
            } else {
              throw Error('User Data is null');
            }
          } catch (e) {
            cb({type: UpdateEvents.ERROR});
          }
        },
      },
    },
    [UpdateStates.edit]: {
      on: {
        [UpdateEvents.NEXT]: {
          target: UpdateStates.pending,
          actions: assign({
            userData: ({userData}, eventData: {[key: string]: any}) => {
              const updatedUser: UserData = {
                ...userData,
                ...(eventData as UserData),
              };

              return updatedUser;
            },
          }),
        },
      },
    },
    [UpdateStates.pending]: {
      on: {
        [UpdateEvents.NEXT]: {
          target: UpdateStates.done,
          actions: assign({
            error: _ => false,
            errorMsg: _ => '',
            userData: (_, {userData}) => userData,
          }),
        },
        [UpdateEvents.ERROR]: {
          target: UpdateStates.edit,
          actions: assign({
            error: _ => true,
            errorMsg: _ => 'Error',
          }),
        },
      },
      invoke: {
        src: ({userData}) => async cb => {
          try {
            // CALLING BE TO UPDATE USER
            if (userData) {
              const response = await updateUser(userData);

              cb({
                type: UpdateEvents.NEXT,
                userData: response,
              });
            } else {
              throw Error('User Data is null');
            }
          } catch (e) {
            cb({type: UpdateEvents.ERROR});
          }
        },
      },
    },
    [UpdateStates.done]: {
      type: 'final',
      data: {
        userData: ({userData}: UpdateMachineContext) => userData,
      },
    },
  },
});
