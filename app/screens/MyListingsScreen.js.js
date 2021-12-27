import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, View } from 'react-native';

import Screen from '../components/Screen';
import {
  ListItem,
  ListItemDeleteAction,
  ListItemUpdateAction,
  ListItemSeparator,
} from '../components/lists';
import useAuth from '../auth/useAuth';
import listingsApi from '../api/listings';
import colors from '../config/colors';
import Text from '../components/Text';
import Button from '../components/Button';

function MyListingsScreen({ navigation }) {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    setLoading(true);
    const response = await listingsApi.getMyListings(user);
    setLoading(false);
    setError(!response.ok);
    setData(response.data);
    return;
  };
  const handleDelete = async (item) => {
    setLoading(true);
    const response = await listingsApi.deleteMyListings(item._id);
    setLoading(false);

    if (!response.ok) {
      alert('Could not save the text.');
      setError(!response.ok);
    }
    alert('Success!');
    return loadListings();
  };

  return (
    <Screen style={styles.contianer}>
      {error && (
        <>
          <Text>Couldn't retrieve the listings.</Text>
          <Button title="Retry" onPress={loadListings()} />
        </>
      )}
      <ActivityIndicator animating={loading} size="large" />
      {!user.isAdmin && (
        <>
          <Text>You are a USER</Text>
          <Text>you don't have this right</Text>
          <Text>Please contact the admin</Text>
        </>
      )}
      <FlatList
        data={data}
        keyExtractor={(text) => text._id}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.message}
            renderRightActions={() => (
              <>
                <ListItemDeleteAction onPress={() => handleDelete(item)} />
                <ListItemUpdateAction
                  onPress={() => navigation.navigate('Update', item)}
                />
              </>
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => loadListings()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  contianer: {
    backgroundColor: colors.light,
  },
});

export default MyListingsScreen;
