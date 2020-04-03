import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Spinner} from '@ui-kitten/components';
import {theme} from '../utils/Theme';
import FormWrapper from '../components/FormWrapper';
import {Interpreter} from 'xstate';
import {useService} from '@xstate/react';
import {
  UserDataMachineContext,
  UserDataMachineEvents,
} from '../machines/userDataMachine.types';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {
  UpdateEvents,
  UpdateMachineContext,
  UpdateMachineEvents,
  UpdateStates,
} from '../machines/updateMachine.types';

const FormSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  surname: Yup.string().required('Required'),
  email: Yup.string()
    .required('Required')
    .email('Should be an e-mail'),
  phone: Yup.string()
    .required('Required')
    .matches(new RegExp(/^[0-9\s]*$/), 'Only numbers and spaces allowed'),
});

interface Props {
  goBack: () => void;
  service: Interpreter<UserDataMachineContext, any, UserDataMachineEvents, any>;
}

const FormName = ({goBack, service}: Props) => {
  const machine = service.children.get('FormName');
  const [current, send] = useService(
    machine as Interpreter<UpdateMachineContext, any, UpdateMachineEvents>,
  );

  const formik = useFormik({
    initialValues: {
      name: current.context.userData?.name ?? '',
      surname: current.context.userData?.surname ?? '',
      email: current.context.userData?.email ?? '',
      phone: current.context.userData?.phone ?? '',
    },
    validationSchema: FormSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: values => {
      send(UpdateEvents.NEXT, values);
    },
  });

  const submitForm = () => formik.submitForm();

  const isLoading = useMemo(() => {
    if (
      current.matches(UpdateStates.fetch) ||
      current.matches(UpdateStates.pending)
    ) {
      return true;
    }
    return false;
  }, [current]);

  const canProceed = useMemo(() => {
    const errorsArray = Object.keys(formik.errors);

    if (isLoading || errorsArray.length > 0) {
      return false;
    }
    return true;
  }, [isLoading, formik.errors]);

  return (
    <FormWrapper
      title="Name and contact"
      nextBtnAction={submitForm}
      nextDisabled={!canProceed}
      backBtnAction={goBack}
      backDisabled={isLoading}>
      <>
        <Input
          style={styles.input}
          caption={formik.errors['name'] || 'Your first name'}
          label="First name"
          placeholder="Name"
          status={formik.errors['name'] && 'danger'}
          value={formik.values.name}
          onChangeText={text => formik.setFieldValue('name', text)}
          disabled={isLoading}
        />
        <Input
          style={styles.input}
          caption={formik.errors['surname'] || 'Your last name'}
          label="Last name"
          placeholder="Surname"
          status={formik.errors['surname'] && 'danger'}
          value={formik.values.surname}
          onChangeText={text => formik.setFieldValue('surname', text)}
          disabled={isLoading}
        />
        <Input
          style={styles.input}
          caption={formik.errors['email'] || 'You e-mail address'}
          label="E-mail"
          placeholder="E-mail address"
          status={formik.errors['email'] && 'danger'}
          value={formik.values.email}
          onChangeText={text => formik.setFieldValue('email', text)}
          disabled={isLoading}
          autoCapitalize="none"
        />
        <Input
          style={styles.input}
          caption={formik.errors['phone'] || 'Your phone number'}
          label="Phone"
          keyboardType="number-pad"
          placeholder="Phone"
          status={formik.errors['phone'] && 'danger'}
          value={formik.values.phone}
          onChangeText={text => formik.setFieldValue('phone', text)}
          disabled={isLoading}
        />
        {isLoading && (
          <View style={styles.loading}>
            <Spinner status="success" />
          </View>
        )}
      </>
    </FormWrapper>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: theme.spacing.value * 2,
  },
  loading: {
    alignItems: 'center',
  },
});

export default FormName;
