import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';
import Repository from './pages/Repository';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#7159c1' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="Main" component={Main} options={{ title: 'Main' }} />
      <Stack.Screen name="User" component={User} options={{ title: 'User' }} />
      <Stack.Screen
        name="Repository"
        component={Repository}
        options={{ title: 'Repository' }}
      />
    </Stack.Navigator>
  );
}
