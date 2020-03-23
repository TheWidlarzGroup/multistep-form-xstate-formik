/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {ApplicationProvider, Layout, Text, Button} from '@ui-kitten/components';
import {mapping, dark as darkTheme} from '@eva-design/eva';

const App = () => {
  return (
    <ApplicationProvider mapping={mapping} theme={darkTheme}>
      <StatusBar barStyle="dark-content" />
      <Layout style={styles.container}>
        <Text category="h1">Form App</Text>
        <Button
          style={styles.button}
          size="large"
          appearance="ghost"
          status="basic">
          Update you data
        </Button>
      </Layout>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 8,
  },
});

export default App;
