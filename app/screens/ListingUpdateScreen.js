import React from 'react'
import { StyleSheet } from 'react-native'
import * as Yup from 'yup'

import useAuth from '../auth/useAuth'
import listingsApi from '../api/listings'
import { Form, FormField, SubmitButton } from '../components/forms'
import Screen from '../components/Screen'
import Text from '../components/Text'

// prettier-ignore
const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label('Title'),
  http: Yup.string().max(255).label('Http'),
  message: Yup.string().label('Message'),
  author: Yup.string().max(255),
  email: Yup.string().max(255)
});

function ListingUpdateScreen({ route, navigation }) {
  const { user } = useAuth()
  const text = route.params

  const handleSubmit = async (text) => {
    const result = await listingsApi.updateMyText(text)

    if (!result.ok) return alert('Could not update the text.')
    alert('Success!')
    navigation.goBack('MyListings')
  }

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          _id: text._id,
          title: text.title,
          http: text.http,
          message: text.message,
          author: user.name,
          email: user.email,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Text style={styles.update}>Update Form</Text>
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField maxLength={255} name="http" placeholder="QR Code" />
        <FormField maxLength={255} name="message" placeholder="Message" />
        <SubmitButton title="Update" />
      </Form>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  update: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
export default ListingUpdateScreen
