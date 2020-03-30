import React from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const {navigate} = useNavigation();

  const goNext = () => navigate('FormName');

  return (
    <Layout style={styles.container}>
      <Text category="h1">Form App</Text>
      <Button size="large" appearance="ghost" status="primary" onPress={goNext}>
        Form
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
