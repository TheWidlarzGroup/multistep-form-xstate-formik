/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useCallback} from 'react';
import {StatusBar, SafeAreaView, StyleSheet, BackHandler} from 'react-native';
import {ApplicationProvider, Layout} from '@ui-kitten/components';
import {mapping, dark as darkTheme} from '@eva-design/eva';
import {
  NavigationContainer,
  useNavigation,
  useFocusEffect,
  CommonActions,
} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Home from './src/screens/Home';
import FormName from './src/screens/FormName';
import FormAddress from './src/screens/FormAddress';
import FormPayment from './src/screens/FormPayment';
import Success from './src/screens/Success';
import {useMachine} from '@xstate/react';
import {userDataMachine} from './src/machines/userDataMachine';
import {
  UserDataStates,
  UserDataEvents,
} from './src/machines/userDataMachine.types';

const Stack = createStackNavigator();
const Root = createStackNavigator();

const FormFlow = () => {
  const nav = useNavigation();
  const {navigate} = nav;
  const [current, send, service] = useMachine(userDataMachine);

  useEffect(() => {
    switch (true) {
      case current.matches(UserDataStates.basic):
        nav.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: 'FormName',
              },
            ],
          }),
        );
        break;
      case current.matches(UserDataStates.address):
        nav.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: 'FormAddress',
              },
            ],
          }),
        );
        break;
      case current.matches(UserDataStates.payment):
        nav.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: 'FormPayment',
              },
            ],
          }),
        );
        break;
      case current.matches(UserDataStates.complete):
        nav.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: 'Success',
              },
            ],
          }),
        );
        break;
      default:
        nav.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: 'Home',
              },
            ],
          }),
        );
        break;
    }
  }, [current]);

  const goBack = useCallback(() => {
    send(UserDataEvents.BACK);
  }, [send]);

  const goNext = useCallback(() => {
    send(UserDataEvents.NEXT);
  }, [send]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        goBack();

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [current, goBack]),
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        cardStyle: styles.cardStyle,
        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FormName">
        {() =>
          current.matches(UserDataStates.basic) && (
            <FormName service={service} goBack={goBack} goNext={goNext} />
          )
        }
      </Stack.Screen>
      <Stack.Screen name="FormAddress">
        {() =>
          current.matches(UserDataStates.address) && (
            <FormAddress service={service} goBack={goBack} goNext={goNext} />
          )
        }
      </Stack.Screen>
      <Stack.Screen name="FormPayment">
        {() =>
          current.matches(UserDataStates.payment) && (
            <FormPayment service={service} goBack={goBack} goNext={goNext} />
          )
        }
      </Stack.Screen>
      <Stack.Screen name="Success">
        {() => <Success goBack={goBack} />}
      </Stack.Screen>
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
              screenOptions={{
                headerShown: false,
                cardStyle: styles.cardStyle,
              }}
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

console.log(mapping);

const styles = StyleSheet.create({
  wrapper: {flex: 1},
  cardStyle: {
    backgroundColor: darkTheme['color-basic-800'],
  },
});

export default App;
