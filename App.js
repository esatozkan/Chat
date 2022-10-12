import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatList from './screens/ChatList';
import Chat from "./screens/Chat";
import Settings from "./screens/Settings";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Iconicons } from '@expo/vector-icons';
import { Provider, DefaultTheme } from 'react-native-paper';
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBvpEil8LOjweUjUh3FtcnjxQyc2scAzCY",
  authDomain: "chat-app-5a5f2.firebaseapp.com",
  projectId: "chat-app-5a5f2",
  storageBucket: "chat-app-5a5f2.appspot.com",
  messagingSenderId: "750304889949",
  appId: "1:750304889949:web:2e6dcbc16657f6c45951b4"
};

firebase.initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

const Tabs = createBottomTabNavigator();

const TabsNavigator = () => {
  const navigation = useNavigation();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        navigation.navigate('SignUp');
      }
    });
  }, []);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Iconicons
              name={route.name === "chatList" ? "chatbubbles" : "settings"}
              color={color}
              size={size}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="ChatList" component={ChatList} />
      <Tabs.Screen name="Settings" component={Settings} />
    </Tabs.Navigator>
  );
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196f3',
    accent: '#e91e63',
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <Provider theme={theme}>
        <Tabs.Navigator>
          <Tabs.Screen
            name="Main"
            component={TabsNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ presentation: "fullScreenModal" }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ presentation: "fullScreenModal" }}
          />
        </Tabs.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;

