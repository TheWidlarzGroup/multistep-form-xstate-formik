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
import {
  UpdateMachineContext,
  UpdateMachineEvents,
  UpdateEvents,
  UpdateStates,
} from '../machines/updateMachine.types';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
  account: Yup.string()
    .required('Required')
    .matches(new RegExp(/^[0-9\s]*$/), 'It should be a number'),
  creaditCardNo: Yup.string()
    .required('Required')
    .matches(new RegExp(/^[0-9\s]*$/), 'It should be a number'),
  creditCardExp: Yup.string()
    .required('Required')
    .matches(new RegExp(/^[0-9\/]*$/), 'It should be a number and /'),
  creditCardCvv: Yup.string()
    .required('Required')
    .length(3, 'Should be 3 characters long')
    .matches(new RegExp(/^[0-9\s]*$/), 'It should be a number'),
});

interface Props {
  goBack: () => void;
  service: Interpreter<UserDataMachineContext, any, UserDataMachineEvents, any>;
}

const FormPayment = ({goBack, service}: Props) => {
  const machine = service.children.get('FormPayment');
  const [current, send] = useService(
    machine as Interpreter<UpdateMachineContext, any, UpdateMachineEvents>,
  );

  const formik = useFormik({
    initialValues: {
      account: current.context.userData?.account ?? '',
      creaditCardNo: current.context.userData?.creaditCardNo ?? '',
      creditCardExp: current.context.userData?.creditCardExp ?? '',
      creditCardCvv: current.context.userData?.creditCardCvv ?? '',
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
      title="Payment"
      nextBtnAction={submitForm}
      nextDisabled={!canProceed}
      backBtnAction={goBack}
      backDisabled={isLoading}>
      <>
        <Input
          style={styles.input}
          label="Account number"
          caption={formik.errors['account'] || 'IBAN format'}
          placeholder="Your account number"
          status={formik.errors['account'] && 'danger'}
          value={formik.values.account}
          onChangeText={text => formik.setFieldValue('account', text)}
          disabled={isLoading}
        />
        <Input
          style={styles.input}
          label="Credit card number"
          caption={formik.errors['creaditCardNo']}
          placeholder="Your credit card number"
          status={formik.errors['creaditCardNo'] && 'danger'}
          value={formik.values.creaditCardNo}
          onChangeText={text => formik.setFieldValue('creaditCardNo', text)}
          disabled={isLoading}
        />
        <Input
          style={styles.input}
          label="Credit card expiration date"
          caption={formik.errors['creditCardExp']}
          placeholder="E.g. 12/22"
          status={formik.errors['creditCardExp'] && 'danger'}
          value={formik.values.creditCardExp}
          onChangeText={text => formik.setFieldValue('creditCardExp', text)}
          disabled={isLoading}
        />
        <Input
          style={styles.input}
          label="CVV"
          caption={formik.errors['creditCardCvv']}
          placeholder="CVV"
          status={formik.errors['creditCardCvv'] && 'danger'}
          value={formik.values.creditCardCvv}
          onChangeText={text => formik.setFieldValue('creditCardCvv', text)}
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

export default FormPayment;
