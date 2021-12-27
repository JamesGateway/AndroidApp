import React, { useState, useEffect, useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import BarcodeMask from 'react-native-barcode-mask'

import QrContext from '../auth/Qrcontext'

export default function Scanner({ navigation }) {
  const qrContext = useContext(QrContext)
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [text, setText] = useState('')

  const askCameraPermission = () => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }
  useEffect(() => {
    askCameraPermission()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    setText(data)
  }

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    )
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title="Allow camera" onPress={() => askCameraPermission()} />
      </View>
    )
  }

  return (
    <View style={styles.barcode}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <BarcodeMask edgeColor={'#62B1F6'} showAnimatedLine={false} />
      </BarCodeScanner>
      <View style={styles.cover}>
        {scanned && (
          <>
            <Text
              style={{
                marginVertical: 30,
                fontSize: 30,
                backgroundColor: 'white',
                borderRadius: 5,
              }}
            >
              {text}
            </Text>
            <View style={styles.buttoncover}>
              <View>
                <Button
                  title={'Tap to Scan Again'}
                  onPress={() => setScanned(false)}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title={'Add to QR Code'}
                  onPress={() => {
                    qrContext.setQr(text)
                    return navigation.navigate('Home')
                  }}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcode: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cover: {
    width: '80%',
    marginBottom: 50,
  },
  buttoncover: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: { width: '45%' },
})
