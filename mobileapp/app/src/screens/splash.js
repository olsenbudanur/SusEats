import { Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import { 
    BalsamiqSans_400Regular,
    BalsamiqSans_400Regular_Italic,
    BalsamiqSans_700Bold,
    BalsamiqSans_700Bold_Italic 
  } from '@expo-google-fonts/balsamiq-sans'

import AppLoading from 'expo-app-loading';
import { useState } from 'react';

export default function Splash() {
    const navigation = useNavigation();
    let [fontsLoaded] = useFonts({
        FredokaOne_400Regular,
        BalsamiqSans_400Regular,
        BalsamiqSans_400Regular_Italic,
        BalsamiqSans_700Bold,
        BalsamiqSans_700Bold_Italic 

      });


      const [email, setemail] = useState('');
      const [password, setpassword] = useState('');

      const _loginUser = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "action": "login",
          "email": email,
          "password": password
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("https://us-central1-aiot-fit-xlab.cloudfunctions.net/suseats", requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }

      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
        return (
    <View style={{backgroundColor:"#000", flex:1}}>
        <LinearGradient
        colors={['#57CC99', '#38A3A5']}
        style={{flex:1}}
        >
   <Image source={require('../assets/suseatslogo.png')} style={{alignSelf:'center', marginVertical:'15%', width:'50%', height:'5%', resizeMode:'contain'}}></Image>
    
            <Text style={{fontFamily:'BalsamiqSans_700Bold',textAlign:'center', textAlignVertical:'center', color:"#FFF", fontSize:30, marginBottom:'5%'}}>Welcome back!</Text>

            <View style={{width:'70%', backgroundColor:"#FFF", borderRadius:10, alignSelf:'center', padding:'2.5%', opacity:0.5}}>
                <TextInput placeholder="Email address" style={{fontFamily:'BalsamiqSans_400Regular'}} value={email} onChangeText={(e)=>setemail(e)}></TextInput>
            </View>
            <View style={{width:'70%', backgroundColor:"#FFF", borderRadius:10, alignSelf:'center', padding:'2.5%', opacity:0.5, marginVertical:'5%'}}>
                <TextInput placeholder="Password" secureTextEntry style={{fontFamily:'BalsamiqSans_400Regular'}} value={password} onChangeText={(e)=>setpassword(e)}></TextInput>
            </View>

            <TouchableOpacity onPress={()=>_loginUser()}>
                <View style={{ borderRadius:15,width:150, height:50, alignSelf:'center', backgroundColor:"#FFF", justifyContent:'center', elevation:1}}><Text style={{fontFamily:'BalsamiqSans_700Bold',textAlign:'center', textAlignVertical:'center', color:"#38A3A5", fontSize:20}}>Login</Text>
        </View></TouchableOpacity>
        </LinearGradient>
    </View>
    )
}
};