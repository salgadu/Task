import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../firebase'
import { Styles } from '../components/Styles';

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Login")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
      })
      .catch(error => alert(error.message))
  }

  return (
    
    <View style={{ flex: 1 }}>
      <SafeAreaView style={Styles.safeview}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.labelView}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.labelView}
            secureTextEntry
          />
          <TouchableOpacity
            onPress={handleSignUp}
            style={styles.buttonOutline}
          >
            <Text style={styles.buttonOutlineText}>CONTINUAR</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  labelView: {
    backgroundColor: '#BED8FF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 10
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#5C9DFE',
    borderWidth: 2,
    width: '100%',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center'
  },
  buttonOutlineText: {
    color: '#5C9DFE',
    fontWeight: '700',
    fontSize: 16,
  },
})
