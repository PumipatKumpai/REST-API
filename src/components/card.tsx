
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from "../utils/crud-api";

export default function Card(props) {

  const delPhone = async (id: string) => {
    console.log("Delete phone with id:", id);
        try {
            const res = await api.delete('phones/' + id);
            props.refresh();
            console.log(res);
        } catch(err) {
            console.log(err);
        }
/*
    Alert.alert(
      "Are you sure?", // Title
      "Do you really want to delete this file?", // Message
      [
        {
          //text: "Cancel",
          //onPress: () => console.log("Cancel Pressed"),
          //style: "cancel" // Applies default cancel styling (iOS only)
        },
        { 
          text: "Delete", 
          onPress: () => console.log("Delete Pressed"),
          style: "destructive" // Applies red text styling (iOS only)
        }
      ],
      { cancelable: true } // Allows closing the popup by tapping outside (Android only)
    );
    */
  };

    return (
        <View style={styles.container} key={props.phone.id}>
          <View style={styles.text}>
            <Text style={styles.text}>{props.phone.name}</Text>
            <Text style={styles.text}>{props.phone.sect}</Text>
            <Text style={styles.text}>Tel No.: {props.phone.tel}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
              <Link href={{
                pathname: "/editPhone",
                params: { 
                    id: props.phone.id, 
                    name:  props.phone.name,
                    sect: props.phone.sect,
                    tel: props.phone.tel,
                  },
                }}            
                push style={{backgroundColor: 'yellow', padding: 10,
                    margin: 5, borderRadius: 5,}}>
                    <Text style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'black',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>Edit</Text>
            </Link>
            <TouchableOpacity onPress={()=>delPhone(props.phone.id)}
               style={{backgroundColor: 'red', padding: 10,
                    margin: 5, borderRadius: 5,}}>
                <Text
                  style={{padding: 5, margin: 5, borderRadius: 5, color: 'white', fontWeight: 'bold', textAlign: 'center',}}>
                    Delete
                </Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent:"space-between",
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: '#47F',
  },
  list: {
    backgroundColor: '#47F',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    borderColor: 'red',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  }
});