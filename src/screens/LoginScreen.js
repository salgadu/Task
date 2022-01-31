import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth } from '../utils/firebase'
import { Styles } from '../components/Styles';

import AppLoading from 'expo-app-loading';
import { useFonts, RockSalt_400Regular } from '@expo-google-fonts/rock-salt';


const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
      })
      .catch(error => alert(error.message))
  }

  let [fontsLoaded] = useFonts({
    RockSalt_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
      <View style={{ flex: 1 }}>
         <ImageBackground
        source={require('../../assets/login.png')}
        style={{width: '100%', height: '100%'}}
      >
      <SafeAreaView style={Styles.safeview}>
     
        <Text style={styles.logoText}>T</Text>
        <View style={{ flex: 1 }} />
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
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <View style={styles.justCad}>
        <Text style={{color: 'white'}}>NÃO POSSUI CONTA?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{color: "#5C9DFE", }}> CADASTRE-SE</Text>
        </TouchableOpacity> 
       
        </View>
        
        </SafeAreaView>
        </ImageBackground>
      </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  labelView: {
    backgroundColor: '#BED8FF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#5C9DFE',
    width: '100%',
    padding: 15,
    marginTop: 5,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  logoText: {
    color: 'white',
    marginTop: 30,
    marginLeft: 120, 
    fontFamily: 'RockSalt_400Regular', 
    fontSize: 120,
    alignItems: 'center',
    justifyContent: 'center'
  },
  justCad:{
    alignItems: 'center', 
    marginTop: 15, 
    flexDirection: 'row', 
    justifyContent: 'center'

  }
  
})
