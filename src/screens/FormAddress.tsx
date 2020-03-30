import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Input} from '@ui-kitten/components';
import {theme} from '../utils/Theme';
import {useNavigation} from '@react-navigation/native';
import FormWrapper from '../components/FormWrapper';

const FormAddress = () => {
  const {goBack, navigate} = useNavigation();

  const backBtn = useCallback(() => goBack(), [goBack]);
  const goNext = useCallback(() => navigate('FormPayment'), [navigate]);

  return (
    <FormWrapper title="Address" backBtnAction={backBtn} nextBtnAction={goNext}>
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
