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
import {StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import {ApplicationProvider, Layout} from '@ui-kitten/components';
import {mapping, dark as darkTheme} from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import FormName from './src/screens/FormName';
import FormAddress from './src/screens/FormAddress';
import FormPayment from './src/screens/FormPayment';
import Success from './src/screens/Success';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <ApplicationProvider mapping={mapping} theme={darkTheme}>
        <Layout style={styles.wrapper}>
          <SafeAreaView style={styles.wrapper}>
            <StatusBar barStyle="light-content" />
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="FormName" component={FormName} />
              <Stack.Screen name="FormAddress" component={FormAddress} />
              <Stack.Screen name="FormPayment" component={FormPayment} />
              <Stack.Screen name="Success" component={Success} />
            </Stack.Navigator>
          </SafeAreaView>
        </Layout>
      </ApplicationProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {flex: 1},
});

export default App;
