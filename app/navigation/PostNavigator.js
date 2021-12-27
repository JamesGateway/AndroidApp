import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ScanScreen from '../screens/ScanScreen';
import ListingEditScreen from '../screens/ListingEditScreen';

const Stack = createStackNavigator();

const PostNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={ListingEditScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="ScanQR" component={ScanScreen} />
  </Stack.Navigator>
);

export default PostNavigator;
