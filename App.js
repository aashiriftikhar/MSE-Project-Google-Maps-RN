

import React from 'react';
import {
  StyleSheet,
  Dimensions,
  PermissionsAndroid
} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service'
export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      longitude:'',
      latitude:'',
      loading:true
    }
  }

  async componentDidMount(){
    var that = this;

    async function requestLocationPermission(){
      try{
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
          'title':'Location Access required',
          'message':'App needs your locations'
        })
        if(granted===PermissionsAndroid.RESULTS.GRANTED){
          that.callLocation(that)
        }
        else{
          console.log("NOT GRANTED")
        }

      } catch(err){
        console.log(err)
      }
      }

      requestLocationPermission()
    }
  

    callLocation(that){
      Geolocation.getCurrentPosition((position)=>{
        const long = position.coords.longitude
        const lat = position.coords.latitude

        this.setState({
          longitude:parseFloat(long,10),
          latitude:parseFloat(lat,10),
          loading:false
        })
        console.log(`Longitude: ${long} and Latitude: ${lat}`)
      },(err)=>{
        console.log(err)
      },{
        enableHighAccuracy:false , timeout:20000
      })
    }


  render(){
      if(this.state.loading==true){
        return(<></>)
      }
      else{
        return(
        <MapView
        
    initialRegion={{
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    showsUserLocation={true}
    
    
    style={styles.container}

        >
        <Marker draggable={true}
        coordinate={
          {longitude: this.state.longitude, latitude: this.state.latitude}
          }
          onDragEnd={(e)=>{
            console.log(e.nativeEvent.coordinate)
          }}
          />
        </MapView>


        )
    
  }
}
}
styles = StyleSheet.create({
  container:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height
  }
})
