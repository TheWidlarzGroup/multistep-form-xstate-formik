import React, {useCallback} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Layout, Text, Button, Input} from '@ui-kitten/components';
import {theme} from '../utils/Theme';
import {useNavigation} from '@react-navigation/native';

const FormName = () => {
  const {goBack, navigate} = useNavigation();

  const backBtn = useCallback(() => goBack(), [goBack]);
  const goNext = useCallback(() => navigate('FormAddress'), [navigate]);

  return (
    <>
      <Layout style={styles.container}>
        <Text style={styles.title} category="h2">
          Name and contact
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

export default FormName;
