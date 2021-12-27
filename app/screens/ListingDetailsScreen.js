import React from 'react'
import { StyleSheet, View } from 'react-native'

import Text from '../components/Text'
import Screen from '../components/Screen'
import colors from '../config/colors'
import ListItem from '../components/lists/ListItem'

export default function ListingDetailsScreen({ route }) {
  const texting = route.params
  const date = new Date(texting.date)
  return (
    <Screen>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{texting.title}</Text>
        <Text style={styles.http}>Http: {texting.http}</Text>
        <Text style={styles.message}>Message: {texting.message}</Text>
        <Text style={styles.date}>Date: {date.toString()}</Text>
        <View style={styles.userContainer}>
          <Text style={styles.author}>Author:</Text>
          <ListItem title={texting.author} subTitle={texting.email} />
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  http: {
    fontSize: 20,
    marginTop: 10,
  },
  message: {
    marginTop: 20,
  },
  date: {
    fontSize: 15,
    color: colors.medium,
    marginVertical: 15,
  },
  author: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userContainer: {
    marginVertical: 35,
  },
})
