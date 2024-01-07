import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import StartScreen from "./screens/StartScreen";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import Toast from "react-native-toast-message";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{
            headerShown: false,
            title: "Welcome to Durak Game!",
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            title: "Welcome to Durak Game!",
          }}
        />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>

      <Toast />
      <StatusBar hidden={true} />
    </NavigationContainer>

    // <NavigationContainer>
    //   <MyTabs />
    // </NavigationContainer>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName={"INITIAL_ROUTE_NAME"}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        // options={{
        //   tabBarButton: () => <HomeScreenModal />,
        // }}
      />
      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      {/* <Tab.Screen name="About" component={AboutScreen} /> */}
    </Tab.Navigator>
  );
}

function HomeScreenModal() {
  return (
    <Button buttonColor="red" textColor="#FFFFFF" onPress={startGame}>
      Start Game
    </Button>
  );
}

function startGame() {
  <View>
    <Text>Starting Game!!!!</Text>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
  },
});
