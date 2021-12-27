import React from 'react';
import { StyleSheet, View } from 'react-native';

import useAuth from '../auth/useAuth';

import Icon from '../components/Icon';
import ListItem from '../components/lists/ListItem';
import Screen from '../components/Screen';
import colors from '../config/colors';

export default function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem title={user.name} subTitle={user.email} />
      </View>
      <View style={styles.container}>
        <ListItem
          title={'My Listings'}
          IconComponent={
            <Icon
              name={'format-list-bulleted'}
              backgroundColor={colors.primary}
            />
          }
          onPress={() => navigation.navigate('MyListings')}
        />
      </View>
      <ListItem
        title="Log out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});
