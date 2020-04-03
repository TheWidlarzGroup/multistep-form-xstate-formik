import React from 'react';
import {Layout, Text, Spinner} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {theme} from '../utils/Theme';

const Home = () => {
  return (
    <Layout style={styles.container}>
      <Text style={styles.text} category="h1">
        Form App
      </Text>
      <Text style={styles.text}>Fetching user data</Text>
      <Spinner status="success" />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {marginBottom: theme.spacing.value * 4},
});

export default Home;
