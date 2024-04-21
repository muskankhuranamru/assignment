import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
