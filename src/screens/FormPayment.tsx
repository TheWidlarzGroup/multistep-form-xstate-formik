import React, {useCallback} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Layout, Text, Button, Input} from '@ui-kitten/components';
import {theme} from '../utils/Theme';
import {useNavigation} from '@react-navigation/native';

const FormPayment = () => {
  const {goBack, navigate} = useNavigation();

  const backBtn = useCallback(() => goBack(), [goBack]);
  const goNext = useCallback(() => navigate('Success'), [navigate]);

  return (
    <>
      <Layout style={styles.container}>
        <Text style={styles.title} category="h2">
          Payment info
        </Text>
        <KeyboardAvoidingView
          keyboardVerticalOffset={theme.spacing.value * 4}
          style={[styles.container]}
          behavior="height">
          <View style={styles.top}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.form}>
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
              </View>
            </ScrollView>
          </View>
          <View style={styles.bottom}>
            <Button
              style={styles.next}
              size="medium"
              appearance="ghost"
              status="basic"
              onPress={backBtn}>
              Back
            </Button>
            <Button
              style={styles.next}
              size="medium"
              appearance="outline"
              status="success"
              onPress={goNext}>
              Next
            </Button>
          </View>
        </KeyboardAvoidingView>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingHorizontal: theme.spacing.value * 2,
    paddingTop: theme.spacing.value * 2,
  },
  top: {
    flex: 20,
    width: '100%',
    paddingHorizontal: theme.spacing.value * 2,
  },
  bottom: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.value * 2,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    paddingBottom: 20,
  },
  form: {
    marginTop: theme.spacing.value * 4,
  },
  input: {
    marginBottom: theme.spacing.value * 2,
  },
  next: {
    alignSelf: 'flex-end',
  },
  prev: {
    alignSelf: 'flex-start',
  },
});

export default FormPayment;
