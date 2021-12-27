import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from '../screens/AccountScreen';
import UpdateNavigator from './UpdateNavigator';

const Stack = createStackNavigator();
const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="MyListings" component={UpdateNavigator} />
  </Stack.Navigator>
);

export default AccountNavigator;
