import { Text, View, Image, ToastAndroid } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useFonts, FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import { 
    BalsamiqSans_400Regular,
    BalsamiqSans_400Regular_Italic,
    BalsamiqSans_700Bold,
    BalsamiqSans_700Bold_Italic 
  } from '@expo-google-fonts/balsamiq-sans'

import AppLoading from 'expo-app-loading';
import { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements';

export default function Home({route}) {
    const navigation = useNavigation();
    const {userid, name} = route.params;
    let [fontsLoaded] = useFonts({
        FredokaOne_400Regular,
        BalsamiqSans_400Regular,
        BalsamiqSans_400Regular_Italic,
        BalsamiqSans_700Bold,
        BalsamiqSans_700Bold_Italic 

      });


      const [like, setlike] = useState('1')
      const [bid, setbid] = useState('')
      const [curated, setCurated] = useState([]);
      const [success, setsuccess] = useState(false)
      const [auctions, setauctions] = useState({"status": "success", "auctions": [{"auctionid": "2", "restaurantid": "2", "restaurantname": "dominos", "cuisine":
      "italian", "description": "chicken parmesan", "imageurl":
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-202102-airfryerchickenparm-180-ls-1612561654.jpg",
      "expiry": "211212123", "address": "the contract address here"}]})

      const _placeBid = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "action": "addbid",
          "auctionid": id,
          "userid": userid,
          "amount": parseFloat(bid)
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("https://us-central1-aiot-fit-xlab.cloudfunctions.net/suseats", requestOptions)
          .then(response => response.json())
          .then(result => {console.log(result); if(result.status=="successfully added"){setlike('-1'); ToastAndroid.showWithGravityAndOffset(
            result.status+" your bid",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
          );}})
          .catch(error => console.log('error', error));
      }


      const _getAuctions = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "action": "getallauctions"
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://us-central1-aiot-fit-xlab.cloudfunctions.net/suseats", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result); setauctions(result)})
        .catch(error => console.log('error', error));
      }

      const _getCuratedAuctions = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "action": "magecall",
        "userid":userid
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://us-central1-aiot-fit-xlab.cloudfunctions.net/suseats", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result.restaurantids); setCurated(result.restaurantids)})
        .catch(error => console.log('error', error));

      }

      useEffect(() => {
          _getAuctions();
          _getCuratedAuctions();
      }, [])

      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
        return (
    <View style={{backgroundColor:"#fff", flex:1}}>
        <LinearGradient
        colors={['#57CC99', '#38A3A5']}
        style={{height:100,borderBottomLeftRadius:20}}
        >
               <Image source={require('../assets/suseatslogo.png')} style={{alignSelf:'center', marginVertical:'15%', width:'100%', height:'20%', resizeMode:'contain'}}></Image>

            </LinearGradient>
    
            <Text style={{fontFamily:'BalsamiqSans_700Bold',textAlign:'left', marginHorizontal:'5%', textAlignVertical:'center', color:"#57CC99", fontSize:30, marginBottom:'.5%'}}>Hey, {name}!</Text>
            <Text style={{fontFamily:'BalsamiqSans_400Regular',textAlign:'left', marginHorizontal:'5%', textAlignVertical:'center', color:"#57CC99", fontSize:15, marginBottom:'5%'}}>Here are some ongoing auctions curated for you</Text>
            
            <View style={{height:600}}>
                <ScrollView>{auctions.auctions.map((item)=>(curated.includes(parseInt(item.auctionid))&&<View style={{alignSelf:'center', alignContent:'center', borderRadius:20, borderWidth:1, borderColor:'#EAEAEA', paddingBottom:'5%', backgroundColor:"#57CC99", elevation:1}}>
            <View style={{alignSelf:'center', alignContent:'center', borderRadius:20,backgroundColor:"#EAEAEA", opacity:1, marginBottom:'5%', paddingBottom:'5%'}}>
                <View style={{alignSelf:'center', alignContent:'center', borderRadius:20,backgroundColor:"#FFF", opacity:1, marginBottom:'5%'}}>
                    <Text style={{position:'absolute', opacity:0.5, borderTopRightRadius:20,borderBottomLeftRadius:20, top:0, right:0, zIndex:3, backgroundColor:'#EAEAEA', width:100, height:50, textAlignVertical:'center', textAlign:'center', fontFamily:'BalsamiqSans_400Regular'}}>{item.cuisine}</Text>
                <Image source={{uri:item.imageurl}} style={{width:300, height:150, borderRadius:20}}></Image>
                <Text style={{fontFamily:'BalsamiqSans_400Regular', color:'#000', fontSize:20, marginHorizontal:'5%'}}>{item.description}</Text>
                <Text style={{fontFamily:'BalsamiqSans_400Regular', color:'#000', fontSize:15, marginHorizontal:'5%', marginBottom:'0%', flexWrap:'wrap', width:250}}>Just a regular {item.description}</Text>
                <Text style={{fontFamily:'BalsamiqSans_400Regular', color:'#38A3A5', fontSize:10, marginHorizontal:'5%', marginBottom:'5%'}}>{item.restaurantname}</Text>
                </View>
                <Icon name={like==item.auctionid?"heart":"hearto"} type="ant-design" onPress={()=>setlike(item.auctionid)} color={like==item.auctionid?"red":"black"}></Icon>
            </View>
            {like==item.auctionid&&<View style={{flexDirection:'row', alignSelf:'center', width:'70%'}}><View style={{width:'70%', backgroundColor:"#FFF", height:40, borderBottomLeftRadius:10,borderTopLeftRadius:10, alignSelf:'center', padding:'2.5%', opacity:0.5}}>
                <TextInput placeholder="Place Bid" style={{fontFamily:'BalsamiqSans_400Regular'}} value={bid} onChangeText={(e)=>setbid(e)}></TextInput>
            </View>
            <TouchableOpacity onPress={()=>_placeBid(item.auctionid)}>
                <View style={{ marginTop:'5%',borderBottomRightRadius:10,borderTopRightRadius:10,width:40, height:40, alignSelf:'center', backgroundColor:"#FFF", justifyContent:'center', elevation:1}}><Icon name="check" color="#57CC99"></Icon>
        </View></TouchableOpacity>
            </View>}
            </View>))}</ScrollView>
            </View>
            

          

            

        
    </View>
    )
}
};