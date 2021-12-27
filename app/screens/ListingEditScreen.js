import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useFormikContext } from 'formik'
import * as Yup from 'yup'

import QrContext from '../auth/Qrcontext'
import useAuth from '../auth/useAuth'
import listingsApi from '../api/listings'
import { Form, FormField, SubmitButton } from '../components/forms'
import Screen from '../components/Screen'
import Button from '../components/Button'

const validationSchema = Yup.object().shape({
  title: Yup.string().max(50).required().min(1).label('Title'),
  http: Yup.string().max(255).label('Http'),
  message: Yup.string().max(255).label('Message'),
  author: Yup.string().max(255),
  email: Yup.string().max(255),
})

function ListingEditScreen({ navigation }) {
  const { qr, setQr } = useContext(QrContext)
  const { user } = useAuth()

  const QRform = () => {
    const { qr, setQr } = useContext(QrContext)
    const { setFieldValue } = useFormikContext()
    useEffect(() => {
      setFieldValue('http', qr)
    }, [qr])
    return null
  }

  const handleSubmit = async (listing, { resetForm }) => {
    const result = await listingsApi.addListing(listing)
    console.log(`Post Runtime: ${result.duration}`)
    if (!result.ok) return alert('Could not save the text.')
    alert('Success!')
    setQr('')
    resetForm()
  }

  if (!user.isAdmin)
    return (
      <View style={styles.n}>
        <Text>You are a USER</Text>
        <Text>QR Code Scan: {qr}</Text>
        <Button
          title="Scan QR Code"
          color="blue"
          onPress={() => {
            setQr('')
            navigation.navigate('ScanQR')
          }}
        />
      </View>
    )

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          title: '',
          http: `${qr}`,
          message: '',
          author: user.name,
          email: user.email,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <QRform />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField maxLength={255} name="http" placeholder="QR Code" />
        <FormField
          maxLength={255}
          name="message"
          placeholder="Message"
          numberOfLines={3}
        />
        <SubmitButton title="Post" />
      </Form>
      <Button
        title="Scan QR Code"
        color="blue"
        onPress={() => {
          setQr('')
          navigation.navigate('ScanQR')
        }}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  n: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default ListingEditScreen
