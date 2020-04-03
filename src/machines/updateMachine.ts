import {Machine, assign} from 'xstate';
import {
  UpdateMachineContext,
  UpdateMachineStates,
  UpdateMachineEvents,
  UpdateStates,
  UpdateEvents,
} from './updateMachine.types';

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
        src: ctx => async cb => {
          try {
            console.log("hello from child machine, here's the passed context");

            console.log(ctx);

            // await new Promise(res => setTimeout(res, 2000));
            cb({
              type: UpdateEvents.NEXT,
            });
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
        src: _ => async cb => {
          try {
            await new Promise(res => setTimeout(res, 2000));
            cb({
              type: UpdateEvents.NEXT,
            });
          } catch (e) {
            cb({type: UpdateEvents.ERROR});
          }
        },
      },
    },
    [UpdateStates.done]: {
      type: 'final',
    },
  },
});
