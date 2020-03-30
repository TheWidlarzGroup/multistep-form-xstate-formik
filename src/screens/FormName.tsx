import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Input} from '@ui-kitten/components';
import {theme} from '../utils/Theme';
import {useNavigation} from '@react-navigation/native';
import FormWrapper from '../components/FormWrapper';

const FormName = () => {
  const {goBack, navigate} = useNavigation();

  const backBtn = useCallback(() => goBack(), [goBack]);
  const goNext = useCallback(() => navigate('FormAddress'), [navigate]);

  return (
    <FormWrapper
      title="Name and contact"
      nextBtnAction={goNext}
      backBtnAction={backBtn}>
      <>
        <Input
          style={styles.input}
          caption="Your first name"
          label="First name"
          placeholder="John"
          // value=""
          onChangeText={() => null}
        />
        <Input
          style={styles.input}
          caption="Your last name"
          label="Last name"
          placeholder="Doe"
          // value=""
          onChangeText={() => null}
        />

        <Input
          style={styles.input}
          caption="You e-mail address"
          label="E-mail"
          placeholder="mail@mail.com"
          // value=""
          onChangeText={() => null}
        />
        <Input
          style={styles.input}
          caption="Your phone number"
          label="Phone"
          keyboardType="number-pad"
          placeholder="123 123 123"
          // value=""
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
