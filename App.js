
import Login from './navigation/screen/login';
import { StyleSheet, Text, Image, View, } from 'react-native';
import Home from './navigation/screen/home'
import User from './navigation/screen/user';
import Register from './navigation/screen/register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Sport from './navigation/homeComponent/sport';
import Business from './navigation/homeComponent/business';
import Tech from './navigation/homeComponent/tech';
import Health from './navigation/homeComponent/health';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Trend from './navigation/screen/trend';
import video from './navigation/screen/video';
import InforScreen from './navigation/screen/InforScreen';


const Tab = createBottomTabNavigator();
  function MyTabs() {
    return (
      <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name="home" component={Home} options={{
          tabBarIcon: ()=>(
            <Image style={styles.tabBarIcon} source={require('./navigation/image/home.png')} resizeMode='stretch'/>
          )
        }}/>
        <Tab.Screen name="trend" component={Trend} options={{
          tabBarIcon: ()=>(
            <Image style={styles.tabBarIcon} source={require('./navigation/image/trend.png')} resizeMode='stretch'/>
          )
        }} />
        <Tab.Screen name="entertainment" component={video} options={{
          tabBarIcon: ()=>(
            <Image style={styles.tabBarIcon} source={require('./navigation/image/video.png')} resizeMode='stretch'/>
          )
        }}/>
        <Tab.Screen name="user" component={User}  options={{
          tabBarIcon: ()=>(
            <Image style={styles.tabBarIcon} source={require('./navigation/image/user.png')} resizeMode='stretch'/>
          )
        }}/>
      </Tab.Navigator>
    );
  }

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
    
      <Stack.Navigator initialRouteName="login" screenOptions={{headerShown:false}}>
        <Stack.Screen name="login" component={Login}></Stack.Screen>
        <Stack.Screen name="sign-up" component={Register}></Stack.Screen>
        <Stack.Screen name="sport" component={Sport}></Stack.Screen>
        <Stack.Screen name="tech" component={Tech}></Stack.Screen>
        <Stack.Screen name="health" component={Health}></Stack.Screen>
        <Stack.Screen name="business" component={Business}></Stack.Screen>
        <Stack.Screen name="HomeTabs" component={MyTabs}></Stack.Screen>
        <Stack.Screen name="infor" component={InforScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  
  );
}
const styles = StyleSheet.create({
  tabBarIcon:{
      width:30,
      height:30,
  },

})


