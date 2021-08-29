import React,{useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, Button,ScrollView, Alert } from 'react-native';
import ListPegawai from './ListPegawai';
import Axios from 'axios';

const MainPage = () => {
   const [listDataPegawai, setListDataPegawai] = useState([]);
   const [nama, setNama] = useState('');
   const [alamat, setAlamat] = useState('');
   const [telepon, setTelepon] = useState('');
   const [titleButton, setTitleButton] = useState('Add Pegawai');
   const [dataPewagaiId, setDataPewagaiId] = useState('');


   /**
    * promise
    */
   const getDataPegawai = () => {
      Axios.get('http://10.0.2.2:6969/users')
      .then(res =>  setListDataPegawai(res.data))
      .catch(err => console.log(err));
   };

   const submitData = async () => {
      const data = {nama, alamat, telepon};

      if(titleButton == 'Add Pegawai') {
         Axios.post('http://10.0.2.2:6969/users', data)
         .then((res) =>  {
            console.log(`response-post : ${res}`);
            setNama('');
            setAlamat('');
            setTelepon('');
            getDataPegawai();
         })
         .catch((error) => {console.log(error)});
      } else if(titleButton == 'Update Pegawai'){
         Axios.put(`http://10.0.2.2:6969/users/${dataPewagaiId}`, data)
         .then((res) => {
            console.log(res);
            setNama('');
            setAlamat('');
            setTelepon('');
            setTitleButton('Add Pegawai');
            getDataPegawai();
         });
      }
   };

   const deletePegawai = (id) => {
      Axios.delete(`http://10.0.2.2:6969/users/${id}`)
      .then((res) => {
         console.log(`response-delete : ${res}`);
         getDataPegawai();
      });
   };

   const selectValueItem = (item) => {      
      setDataPewagaiId(item._id);
      setNama(item.nama);
      setAlamat(item.alamat);
      setTelepon(item.telepon);
      setTitleButton('Update Pegawai');
   }

   useEffect(() => {
      getDataPegawai()
   },[]);

   return(
      <ScrollView>  
         <View style={styles.container}>
            <Text style={styles.titleCrud}>CRUD-API</Text>
            <Text style={styles.lineBatas}></Text>

            <TextInput 
               style={styles.inputan} 
               placeholder='Nama' 
               value={nama}
               onChangeText={(value) => setNama(value) }/>

            <TextInput 
               style={styles.inputan} 
               placeholder='Alamat'
               value={alamat}
               onChangeText={(value) => setAlamat(value)}/>

            <TextInput 
               style={styles.inputan}
               keyboardType='numeric' 
               placeholder='Telpone'
               value={telepon}
               onChangeText={(value) => setTelepon(value)} />

            <Button title={titleButton} onPress={submitData} />
            <Text style={styles.lineBatas}></Text>
         
                        
            {listDataPegawai.map((listPegawai) => {
               return <ListPegawai 
                        key={listPegawai._id} 
                        nama={listPegawai.nama}
                        alamat={listPegawai.alamat}
                        telephone={listPegawai.telepon}
                        selectItem = {() => selectValueItem(listPegawai)}
                        onDelete={() => {
                           Alert.alert('Warining !!' , 'Apakah yakin Untuk Menghapus ?', 
                           [
                              {text : 'No !', onPress : () => console.log('no')},
                              {text : 'Yes !!!', onPress : () => deletePegawai(listPegawai._id)}
                           ])
                        }} />
                       
            })}
               
         </View>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   container : {
      padding : 20
   },
   titleCrud : {
      textAlign : 'center',
      fontSize : 16
   },
   lineBatas : {
      height : 2,
      backgroundColor : 'black',
      marginVertical : 20
   },
   inputan : {
      borderWidth : 1,
      marginBottom : 12,
      borderRadius : 8,
   },
   buttonAdd : {
      borderRadius : 12,
      padding : 5
   }
});


export default MainPage;