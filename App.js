import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPalace from "./screens/AddPalace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            contentStyle: { backgroundColor: Colors.gray700 },
            headerTintColor: Colors.gray700,
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your Favourite Places",
              headerRight: ({ tintColor }) => {
                return (
                  <IconButton
                    size={24}
                    name="add"
                    color={tintColor}
                    onPress={() => navigation.navigate("addPlace")}
                  />
                );
              },
            })}
          />
          <Stack.Screen
            name="addPlace"
            component={AddPalace}
            options={{
              title: "Add a new Place",
              headerBackTitle: "back",
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              title: "Map",
              headerBackTitle: "back",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
