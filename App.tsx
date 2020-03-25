/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {ApplicationProvider, Layout, Text, Button} from '@ui-kitten/components';
import {mapping, dark as darkTheme} from '@eva-design/eva';
import {getUser, updateUser} from './src/data/Api';
import {UserData} from './src/types/UserData.types';

const App = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const fetchData = async () => {
    setUser(user ? await getUser({...user}) : await getUser());
  };

  const updateData = async () => {
    if (user) {
      setUser(await updateUser({...user, name: 'Kathy'}));
    }
  };

  return (
    <ApplicationProvider mapping={mapping} theme={darkTheme}>
      <StatusBar barStyle="light-content" />
      <Layout style={styles.container}>
        <Text category="h1">Form App</Text>
        <Button
          size="large"
          appearance="ghost"
          status="basic"
          onPress={fetchData}>
          Get user
        </Button>
        <Button
          size="large"
          appearance="ghost"
          status="success"
          onPress={updateData}>
          Update user
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
});

export default App;
