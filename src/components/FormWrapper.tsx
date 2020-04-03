import React from 'react';
import {View, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import {theme} from '../utils/Theme';
import {Layout, Text, Button} from '@ui-kitten/components';

interface Props {
  backBtnAction: () => void;
  nextBtnAction: () => void;
  children: React.ReactChild;
  title: string;
  backDisabled?: boolean;
  nextDisabled?: boolean;
}

const FormWrapper = ({
  backBtnAction,
  nextBtnAction,
  children,
  title,
  backDisabled,
  nextDisabled,
}: Props) => {
  return (
    <Layout style={styles.container}>
      <Text style={styles.title} category="h2">
        {title}
      </Text>
      <KeyboardAvoidingView
        keyboardVerticalOffset={theme.spacing.value * 4}
        style={[styles.container]}
        behavior="height">
        <View style={styles.top}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.form}>{children}</View>
          </ScrollView>
        </View>
        <View style={styles.bottom}>
          <Button
            style={styles.next}
            size="medium"
            appearance="ghost"
            status="basic"
            disabled={backDisabled}
            onPress={backBtnAction}>
            Back
          </Button>
          <Button
            style={styles.next}
            size="medium"
            appearance="outline"
            status="success"
            disabled={nextDisabled}
            onPress={nextBtnAction}>
            Next
          </Button>
        </View>
      </KeyboardAvoidingView>
    </Layout>
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
  next: {
    alignSelf: 'flex-end',
  },
  prev: {
    alignSelf: 'flex-start',
  },
});

export default FormWrapper;
