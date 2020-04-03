import React from 'react';
import {StyleSheet} from 'react-native';
import {Interpreter} from 'xstate';
import {useService} from '@xstate/react';
import {Input} from '@ui-kitten/components';
import {theme} from '../utils/Theme';
import FormWrapper from '../components/FormWrapper';
import {
  UserDataMachineContext,
  UserDataMachineEvents,
} from 'src/machines/userDataMachine.types';

interface Props {
  goBack: () => void;
  goNext: () => void;
  service: Interpreter<UserDataMachineContext, any, UserDataMachineEvents, any>;
}

const FormAddress = ({goBack, service, goNext}: Props) => {
  const machine = service.children.get('FormAddress');
  const [current, send] = useService(
    machine as Interpreter<UserDataMachineContext, any, UserDataMachineEvents>,
  );

  return (
    <FormWrapper title="Address" backBtnAction={goBack} nextBtnAction={goNext}>
      <>
        <Input
          style={styles.input}
          label="Street"
          value=""
          placeholder="18th Dev Avenue"
          onChangeText={() => null}
        />
        <Input
          style={styles.input}
          label="City"
          value=""
          placeholder="South Dev City"
          onChangeText={() => null}
        />
        <Input
          style={styles.input}
          label="Post code"
          value=""
          placeholder="9932"
          onChangeText={() => null}
        />
        <Input
          style={styles.input}
          label="Country"
          value=""
          placeholder="Devland"
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

export default FormAddress;
