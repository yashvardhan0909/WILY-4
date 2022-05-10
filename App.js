import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { NavigationContainer} from '@react-navigation/native';
import Transaction from './screens/Transactions';
import Search from './screens/Search';
import { Rajdhani_600SemiBold } from '@expo-google-fonts/rajdhani';
import * as Font from 'expo-font';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab= createMaterialBottomTabNavigator()
export default class App extends React.Component {
 constructor(){
   super()
   this.state={
     fontloaded:false
   }
 }
  componentDidMount(){}
  async loadFonts(){
    await Font.loadAsync({
      Rajdhani_600SemiBold:Rajdhani_600SemiBold
    })
    this.setState({
      fontloaded:true
    })
  }
  render(){
    if(this.state.fontloaded){
      return (
        <NavigationContainer>
          <Tab.Navigator 
screenOptions={({route})=>({
  tabBarIcon:({focused,color,size})=>{
    var iconName
    if(route.name==='TransactionScreen'){
iconName='book'
    }
    else if(route.name==='SearchScreen'){
iconName='search'
    }
    return(
      <Ionicons 
      name={iconName}
      size={size}
      color={color}
      />
    )
  }
})}
tabBarOptions={{
  activeTintColor: "#FFFFFF",
  inactiveTintColor: "black",
  style: {
    height: 130,
    borderTopWidth: 0,
    backgroundColor: "#5653d4"
  },
  labelStyle: {
    fontSize: 20,
    fontFamily: "Rajdhani_600SemiBold"
  },
  labelPosition: "beside-icon",
  tabStyle: {
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 30,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5653d4"
  }
 }} >
            <Tab.Screen name="TransactionScreen" component={Transaction}/>
            <Tab.Screen name="SearchScreen" component={Search}/>
          </Tab.Navigator>
        </NavigationContainer>
      );
      }
      else{return null;}
  }
}



