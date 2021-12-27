import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ListingUpdateScreen from '../screens/ListingUpdateScreen';
import MyListingsScreen from '../screens/MyListingsScreen.js';

const Stack = createStackNavigator();
const UpdateNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MyLists"
      component={MyListingsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Update"
      component={ListingUpdateScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default UpdateNavigator;
