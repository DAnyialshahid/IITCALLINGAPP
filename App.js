

import * as React from 'react';
import { Text,TextInput, View, StyleSheet,Linking } from 'react-native';

// import axios from 'axios';
import Constants from 'expo-constants';
import {useEffect,useState} from 'react';
// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {

const [count,setCount] =useState(0);
const [username,setUsername] =useState('tooba');
 const onPressMobileNumberClick = (number) => {

//  Linking.openURL("tel:+923112699107");
//  Linking.openURL("https://api.whatsapp.com/send?phone=+923112699107&text=3453534");
 
 }
 function getUpdate(){
setCount(Math.random()*9999999999);
 
 var url='http://192.168.1.222:8000/mobile_app/'+username;
 console.log(url);
      fetch(url)
        .then(response => response.json())
        .then(json => {
              // console.log( json);
              if(json.success){
                var tasks=json.data;
                console.log('tasks',tasks);
                tasks.forEach((task)=>{

                         fetch('http://192.168.1.117:8000/mobile_app/deleteTask/'+task.id).then(response2 => response2.json()).then(json2 => {
                              console.log('json2',json2);
                              if(json2.success){
                                if(task.task_name=='call'){
                                  console.log('task_data',task.task_data);
                                  console.log('Calling ...............................'+task.task_data.contact);
                                  Linking.openURL("tel:"+task.task_data.contact);
                                }
                                if(task.task_name=='whatsapp'){
                                  console.log('task_data',task.task_data);
                                  console.log('Messging to whatsapp ...............................'+task.task_data.contact);
                                  Linking.openURL("https://api.whatsapp.com/send?phone="+task.task_data.contact+"&text="+task.task_data.message);
                                }
                                
                                if(task.task_name=='sms'){ 
                                  console.log('task_data',task.task_data);
                                  console.log('Sms to contact ...............................'+task.task_data.contact);
                                    Linking.openURL("sms://"+task.task_data.contact+"?body="+task.task_data.message);
                                }
                              }
                         });
                  

                });
                console.log('data',tasks);
              }
          setTimeout(getUpdate,200)
       
        })
        .catch(error => {
          console.error(error);
                 setTimeout(getUpdate,200)
        });


 }
  useEffect(()=>{
    getUpdate();

   

   
 },[])


  return (
    <View style={styles.container}>
 
          <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Username Here"
               placeholderTextColor = "black"
               autoCapitalize = "none"
               onChangeText={text => setUsername(text)}
                /> 
 <Text style={styles.paragraph}>{count}</Text>
    <AssetExample />
 
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   }
});
