import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Input} from '@ui-kitten/components';
import {theme} from '../utils/Theme';
import {useNavigation} from '@react-navigation/native';
import FormWrapper from '../components/FormWrapper';

const FormPayment = () => {
  const {goBack, navigate} = useNavigation();

  const backBtn = useCallback(() => goBack(), [goBack]);
  const goNext = useCallback(() => navigate('Success'), [navigate]);

  return (
    <FormWrapper title="Payment" backBtnAction={backBtn} nextBtnAction={goNext}>
      <>
        <Input
          style={styles.input}
          label="Account number"
          caption="IBAN format"
          // value=""
          placeholder="E.g. DE12 1234 1234 1234 1234 44"
          onChangeText={() => null}
        />
        <Input
          style={styles.input}
          label="Credit ard number"
          // value=""
          placeholder="Your credit card number"
          onChangeText={() => null}
        />
        <Input
          style={styles.input}
          label="Credit card expiration date"
          // value=""
          placeholder="E.g. 12/22"
          onChangeText={() => null}
        />
        <Input
          style={styles.input}
          label="CVV"
          // value=""
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
