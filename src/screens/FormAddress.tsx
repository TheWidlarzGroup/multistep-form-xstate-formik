import React, {useCallback} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Layout, Text, Button, Input} from '@ui-kitten/components';
import {theme} from '../utils/Theme';
import {useNavigation} from '@react-navigation/native';

const FormAddress = () => {
  const {goBack, navigate} = useNavigation();

  const backBtn = useCallback(() => goBack(), [goBack]);
  const goNext = useCallback(() => navigate('FormPayment'), [navigate]);

  return (
    <>
      <Layout style={styles.container}>
        <Text style={styles.title} category="h2">
          Address
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

export default FormAddress;
