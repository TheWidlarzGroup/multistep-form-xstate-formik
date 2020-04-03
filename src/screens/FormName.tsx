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

interface Props {
  goBack: () => void;
  goNext: () => void;
  service: Interpreter<UserDataMachineContext, any, UserDataMachineEvents, any>;
}

const FormName = ({goBack, goNext, service}: Props) => {
  const machine = service.children.get('FormName');
  const [current, send] = useService(
    machine as Interpreter<UserDataMachineContext, any, UserDataMachineEvents>,
  );

  return (
    <FormWrapper
      title="Name and contact"
      nextBtnAction={goNext}
      backBtnAction={goBack}>
      <>
        <Input
          style={styles.input}
          caption="Your first name"
          label="First name"
          placeholder="John"
          value=""
          onChangeText={() => null}
        />
        <Input
          style={styles.input}
          caption="Your last name"
          label="Last name"
          placeholder="Doe"
          value=""
          onChangeText={() => null}
        />

        <Input
          style={styles.input}
          caption="You e-mail address"
          label="E-mail"
          placeholder="mail@mail.com"
          value=""
          onChangeText={() => null}
        />
        <Input
          style={styles.input}
          caption="Your phone number"
          label="Phone"
          keyboardType="number-pad"
          placeholder="123 123 123"
          value=""
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

export default FormName;
