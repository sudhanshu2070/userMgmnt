import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {store, persistor} from './src/redux/store'
import HomeScreen from './src/screens/HomeScreen';
import FormScreen from './src/screens/FormScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: '#ffffff'}, 
            headerTintColor: '#212121', 
            headerTitleStyle: {
              fontFamily: 'lucida grande', 
              fontWeight: 'condensedBold'
            },
          }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Form" component={FormScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}