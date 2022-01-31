import * as React from 'react';
import { List } from 'react-native-paper';
import { firestore, auth } from '../utils/firebase';
import { Modal, Alert, StyleSheet, View, Text, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { useState } from "react";

function Todo({ id, text, check }) { 

 const deletarAlert = () =>

    Alert.alert(
      "Deletar Nota",
      "Você tem certeza?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteItem() }
      ]
    );

  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState('')
  
  async function toggleComplete() {    
    await firestore.collection(auth.currentUser?.uid)     
    .doc(id)      
    .update({check: !check});  }
    

  async function deleteItem() {    
    await firestore.collection(auth.currentUser?.uid)          
    .doc(id)      
    .delete();  
    
    setModalVisible(!modalVisible)
  }

  async function editItem() {    
      await firestore.collection(auth.currentUser?.uid)          
      .doc(id)      
      .update({text: nome}) 
      
      setModalVisible(!modalVisible)
    }
 
  return ( 
      <View style={styles.labelView}>
        <List.Item style={styles.textLine}   
        title={text}
        titleStyle = {check ? styles.txtCheck : {color: "#808080", fontWeight: "bold",}}      
        onPress={() => toggleComplete()}   
        onLongPress = {() => setModalVisible(!modalVisible)}   
        left={props => ( <List.Icon {...props} icon={check ? 'checkbox-marked' : 'checkbox-blank-outline'} />)} /> 
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Editar ou Excluir Nota</Text>
            <TextInput
            placeholder="Editar Nota"
            value={nome}
            onChangeText={text => setNome(text)}
            style={styles.labelViewedit}
            />
            <View style={styles.justCad}>
            <TouchableOpacity style={styles.justBtn} onPress={() => deletarAlert()}>
              <Text style={styles.txtBtn2}>Excluir Nota</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.justBtn} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.txtBtn}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.justBtn} onPress={() =>  editItem()}>
              <Text style={styles.txtBtn}>OK</Text>
            </TouchableOpacity> 
           
            </View> 
          </View>
        </View>
      </Modal>
      </View>
     );}
 

export default React.memo(Todo);


const styles = StyleSheet.create({
  labelView: {
    backgroundColor: '#F9D5E5',
    borderRadius: 6,
    margin: 1,
    width: '100%',
  },
  textLine: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 6,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    color: "#808080",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16
  },
  justCad:{
    alignItems: 'center', 
    marginTop: 10, 
    flexDirection: 'row', 
    justifyContent: 'center'
  },
  justBtn:{
    marginLeft: 10, 
    marginRight: 10 
  },
  labelViewedit: {
    backgroundColor: '#E8EEFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 10,
    width: 220,
    borderColor: '#5C9DFE',
    borderWidth: 2,
  },
  txtBtn: {
    color: "#5C9DFE",  
    fontWeight: "bold",
    fontSize: 16
  },
  txtBtn2: {
    color: "#FF0000",  
    fontWeight: "bold",
    fontSize: 16
  },
  txtCheck:{
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid', 
    color: "#808080", 
    fontWeight: "bold",
  },
})