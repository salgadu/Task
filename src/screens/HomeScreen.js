
import React from 'react';
import { TouchableOpacity, FlatList, Alert, View, Text, TextInput, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { firestore, auth } from '../utils/firebase'
import { Avatar, IconButton} from 'react-native-paper';
import Todo from '../components/Todo';
import { useNavigation } from '@react-navigation/native';
import { Styles } from '../components/Styles';

const HomeScreen = () => {
  
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  async function addTodo() {    
    await ref.add({      
      text: todo,      
      check: false,    
    });    
    setTodo('');  
  }

  const logoutAlert = () =>
  Alert.alert(
    "LOGOUT",
    "Você tem certeza que deseja sair?",
    [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => handleSignOut() }
    ]
  );

  const ref = firestore.collection(auth.currentUser?.uid);
  const [ todo, setTodo ] = useState(''); 
  const [ loading, setLoading ] = useState(true);  
  const [ todos, setTodos ] = useState([]);

  useEffect(() => {    
    return ref.onSnapshot(querySnapshot => {      
      const list = [];      
      querySnapshot.forEach(doc => {        
        const { text, check } = doc.data();        
        list.push({          
          id: doc.id,          
          text,          
          check,        
        });      
      });
        setTodos(list);
        if (loading) {        
          setLoading(false); 
          return null;     
        }    
      });  
    }, 
    []);

  return (  
    <View style={Styles.safeview}>  
      <View style={styles.labelView3}>
      <Avatar.Image marginLeft={15} size={24} source={require('../../assets/profile.jpg')} />
      <Text style={styles.buttonOutlineText2}> TAREFAS </Text>
      <IconButton
        icon="logout"
        color={"white"}
        size={24}
        onPress={logoutAlert}
      />
      </View>
      <FlatList       
         style={{flex: 1, marginTop: 10}}        
         data={todos}        
         keyExtractor={(item) => item.id}        
         renderItem={({ item }) => <Todo {...item} />}      
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> 
      <TextInput style={styles.labelView} placeholder={'Nova Tarefa'} value={todo} onChangeText={setTodo} />      
      <TouchableOpacity
        onPress={() => addTodo()}
        style={styles.roundButton}
      >
        <Text style={styles.buttonOutlineText}>+</Text>
      </TouchableOpacity>
      </View> 
    </View>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  labelView: {
    backgroundColor: '#E8EEFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 10,
    width: '80%',
    borderColor: '#5C9DFE',
    borderWidth: 2,
  },
  labelView3: {
    backgroundColor: '#BED8FF',
    width: '100%',
    marginTop: 25,
    borderRadius: 6,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
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
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText2: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  roundButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#5C9DFE',
  },
})