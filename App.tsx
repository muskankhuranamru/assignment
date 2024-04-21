// App.tsx

import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
