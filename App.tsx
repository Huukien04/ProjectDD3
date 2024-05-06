import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MainScreen from './screens/HomeScreen'; 
import FavoriteScreen from './screens/FavoriteScreen';
import LibraryScreen from './screens/LibraryScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Screen } from 'react-native-screens';


const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer 
     >
      <Tab.Navigator 
       tabBarOptions={{
        activeTintColor: '#FF3399', 
        inactiveTintColor: 'black', 
      }} >
        
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          headerShown:false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          headerShown:false,
         
          tabBarLabel: 'Favorite',
          tabBarIcon: ({ color }) => (
            <Icon name="head-side-cough" color={color} size={26} />
          ),
        }}
      />     
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          headerShown:false,
          tabBarLabel: 'Library',
          tabBarIcon: ({ color }) => (
            <Icon name="bars" color={color} size={26} />
          ),
        }}
      /> 
       <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown:false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="users" color={color} size={26} />
          ),
        }}
      /> 
        
       
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
