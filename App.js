

import * as React from 'react';
import { Text, View, StyleSheet,Linking } from 'react-native';

// import axios from 'axios';
import Constants from 'expo-constants';
import {useEffect,useState} from 'react';
// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {

const [count,setCount] =useState(0);
 const onPressMobileNumberClick = (number) => {

//  Linking.openURL("tel:+923112699107");
//  Linking.openURL("https://api.whatsapp.com/send?phone=+923112699107&text=3453534");
 
 }
 function getUpdate(){
setCount(Math.random()*9999999999);
 
      fetch('http://192.168.1.117:8000/mobile_app/tooba')
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
          setTimeout(getUpdate,1000)
       
        })
        .catch(error => {
          console.error(error);
                 setTimeout(getUpdate,1000)
        });


 }
  useEffect(()=>{
    getUpdate();

      // setInterval(()=>{
   

    

      //     // axios.get('http://mywebsite.com/mobile_app/tooba').then((res)=>{
      //     //   console.log(res.data)  
      //     // });

      // },10000);

   
 },[])


  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
 {count}
      </Text>
      <Card      onPress={() => { onPressMobileNumberClick() }} >
        <AssetExample />
      </Card>
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
});
