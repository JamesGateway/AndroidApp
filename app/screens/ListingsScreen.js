import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

import routes from '../navigation/routes';
import listingsApi from '../api/listings';
import useApi from '../hooks/useApi';
import Card from '../components/Card';
import Screen from '../components/Screen';
import colors from '../config/colors';
import Text from '../components/Text';
import Button from '../components/Button';

export default function ListingsScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: listings,
    error,
    loading,
    request: loadListings,
  } = useApi(listingsApi.getListings);

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <Text>Couldn't retrieve the listings.</Text>
          <Button title="Retry" onPress={loadListings()} />
        </>
      )}
      <ActivityIndicator animating={loading} size="large" />
      <FlatList
        data={listings}
        keyExtractor={(texting) => texting._id}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            http={item.http}
            message={item.message}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
        refreshing={refreshing}
        onRefresh={() => loadListings()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 15,
    backgroundColor: colors.light,
  },
});
