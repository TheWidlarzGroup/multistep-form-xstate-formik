import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Interpreter} from 'xstate';
import {useService} from '@xstate/react';
import {Input, Spinner} from '@ui-kitten/components';
import {theme} from '../utils/Theme';
import FormWrapper from '../components/FormWrapper';
import {
  UserDataMachineContext,
  UserDataMachineEvents,
} from '../machines/userDataMachine.types';
import {
  UpdateStates,
  UpdateMachineContext,
  UpdateMachineEvents,
  UpdateEvents,
} from '../machines/updateMachine.types';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
  street: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  code: Yup.string()
    .required('Required')
    .matches(
      new RegExp(/^[0-9\s-]*$/),
      'Only numbers, spaces and - are allowed',
    ),
  country: Yup.string().required('Required'),
});

interface Props {
  goBack: () => void;
  service: Interpreter<UserDataMachineContext, any, UserDataMachineEvents, any>;
}

const FormAddress = ({goBack, service}: Props) => {
  const machine = service.children.get('FormAddress');
  const [current, send] = useService(
    machine as Interpreter<UpdateMachineContext, any, UpdateMachineEvents>,
  );

  const formik = useFormik({
    initialValues: {
      street: current.context.userData?.street ?? '',
      city: current.context.userData?.city ?? '',
      code: current.context.userData?.code ?? '',
      country: current.context.userData?.country ?? '',
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
      title="Address"
      nextBtnAction={submitForm}
      nextDisabled={!canProceed}
      backBtnAction={goBack}
      backDisabled={isLoading}>
      <>
        <Input
          style={styles.input}
          caption={formik.errors['street']}
          label="Street"
          placeholder="Your street"
          status={formik.errors['street'] && 'danger'}
          value={formik.values.street}
          onChangeText={text => formik.setFieldValue('street', text)}
          disabled={isLoading}
        />
        <Input
          style={styles.input}
          caption={formik.errors['city']}
          label="City"
          placeholder="Your city"
          status={formik.errors['city'] && 'danger'}
          value={formik.values.city}
          onChangeText={text => formik.setFieldValue('city', text)}
          disabled={isLoading}
        />
        <Input
          style={styles.input}
          caption={formik.errors['code']}
          label="Post code"
          placeholder="Your post code"
          status={formik.errors['code'] && 'danger'}
          value={formik.values.code}
          onChangeText={text => formik.setFieldValue('code', text)}
          disabled={isLoading}
        />
        <Input
          style={styles.input}
          caption={formik.errors['country']}
          label="Country"
          placeholder="What country do you live in?"
          status={formik.errors['country'] && 'danger'}
          value={formik.values.country}
          onChangeText={text => formik.setFieldValue('country', text)}
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

export default FormAddress;
