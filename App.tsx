/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import {ApplicationProvider, Layout} from '@ui-kitten/components';
import {mapping, dark as darkTheme} from '@eva-design/eva';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import FormName from './src/screens/FormName';
import FormAddress from './src/screens/FormAddress';
import FormPayment from './src/screens/FormPayment';
import Success from './src/screens/Success';
import {useMachine} from '@xstate/react';
import {userDataMachine} from './src/machines/userDataMachine';
import {UserDataStates} from './src/machines/userDataMachine.types';

const Stack = createStackNavigator();
const Root = createStackNavigator();

const FormFlow = () => {
  const nav = useNavigation();
  const {navigate} = nav;
  const [current] = useMachine(userDataMachine);

  useEffect(() => {
    switch (true) {
      case current.matches(UserDataStates.basic):
        navigate('FormName');
        break;
      case current.matches(UserDataStates.address):
        navigate('FormAddress');
        break;
      case current.matches(UserDataStates.payment):
        navigate('FormPayment');
        break;
      case current.matches(UserDataStates.complete):
        navigate('Success');
        break;
      default:
        navigate('Home');
        break;
    }
  }, [current]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FormName" component={FormName} />
      <Stack.Screen name="FormAddress" component={FormAddress} />
      <Stack.Screen name="FormPayment" component={FormPayment} />
      <Stack.Screen name="Success" component={Success} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <ApplicationProvider mapping={mapping} theme={darkTheme}>
        <Layout style={styles.wrapper}>
          <SafeAreaView style={styles.wrapper}>
            <StatusBar barStyle="light-content" />
            <Root.Navigator
              screenOptions={{headerShown: false}}
              initialRouteName="Form">
              <Root.Screen name="Form" component={FormFlow} />
              {/* ANOTHER PART OF THE APP */}
            </Root.Navigator>
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
