import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/screens/splash';




const Stack = createStackNavigator();

function SusStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Splash" 
        component={Splash} 
        options={{ headerShown: false}} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <SusStack />
    </NavigationContainer>
  );
}
