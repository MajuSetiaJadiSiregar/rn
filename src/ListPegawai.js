import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ListPegawai = (props) => {

   return(
      <View style={styles.containerList}>
         <TouchableOpacity onPress={props.selectItem}>
            <Text style={styles.nama}>Nama : {props.nama}</Text>
            <Text style={styles.alamat}>Alamat : {props.alamat}</Text>
            <Text style={styles.telephone}>Telephone : {props.telephone}</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={props.onDelete}>
            <Text style={styles.delete}>x</Text>
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   containerList : {
      flexDirection : 'row',
      marginBottom : 20,
      borderRadius : 8,
      borderWidth : 1,
      borderColor : 'blue'
   },
   containerRow : {
      flexDirection : 'row',
      marginBottom : 20,
      borderRadius : 8,
      borderWidth : 1,
      borderColor : 'blue'
   },
   nama : {
      fontSize : 20,
      fontWeight : 'bold',
      padding : 5
   },
   alamat : {
      fontSize : 16,
      padding : 5
   },
   telephone : {
      fontSize : 16,
      padding : 5
   },
   delete : {
      color : 'red',
      fontWeight : 'bold',
      fontSize : 24,
      marginLeft : 100
   }
});

export default ListPegawai;