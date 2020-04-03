import React from 'react';
import {StyleSheet} from 'react-native';
import {Input} from '@ui-kitten/components';
import {theme} from '../utils/Theme';
import FormWrapper from '../components/FormWrapper';
import {Interpreter} from 'xstate';
import {useService} from '@xstate/react';
import {
  UserDataMachineContext,
  UserDataMachineEvents,
} from '../machines/userDataMachine.types';
import {
  UpdateMachineContext,
  UpdateMachineEvents,
} from '../machines/updateMachine.types';

interface Props {
  goBack: () => void;
  goNext: () => void;
  service: Interpreter<UserDataMachineContext, any, UserDataMachineEvents, any>;
}

const FormPayment = ({goBack, goNext, service}: Props) => {
  const machine = service.children.get('FormPayment');
  const [current, send] = useService(
    machine as Interpreter<UpdateMachineContext, any, UpdateMachineEvents>,
  );

  return (
    <FormWrapper title="Payment" backBtnAction={goBack} nextBtnAction={goNext}>
      <>
        <Input
          style={styles.input}
          label="Account number"
          caption="IBAN format"
          value=""
          placeholder="E.g. DE12 1234 1234 1234 1234 44"
          onChangeText={() => null}
        />
        <Input
          style={styles.input}
          label="Credit ard number"
          value=""
          placeholder="Your credit card number"
          onChangeText={() => null}
        />
        <Input
          style={styles.input}
          label="Credit card expiration date"
          value=""
          placeholder="E.g. 12/22"
          onChangeText={() => null}
        />
        <Input
          style={styles.input}
          label="CVV"
          value=""
          placeholder="CVV"
          onChangeText={() => null}
        />
      </>
    </FormWrapper>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: theme.spacing.value * 2,
  },
});

export default FormPayment;
