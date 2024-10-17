import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View,ActivityIndicator} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPalace from "./screens/AddPalace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import { useEffect, useState } from "react";
import { init } from "./util/database";
import PlaceDetails from "./screens/PlaceDetails";
 const Stack = createNativeStackNavigator();

 function SplashScreen() {
   return (
     <View style={styles.splashContainer}>
       <ActivityIndicator size="large" color={Colors.primary500} />
       <Text style={styles.splashText}>Loading...</Text>
     </View>
   );
 }
export default function App() {
   const [dbInitialized, setDbInitialized] = useState(false);

   useEffect(() => {
     init()
       .then(() => {
         setDbInitialized(true);
       })
       .catch((err) => {
         console.log(err);
       });
   }, []);

   if (!dbInitialized) {
     return <SplashScreen />;
   }
 
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
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
               title:"Place loading...",
              headerBackTitle: "back",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gray700,
  },
  splashText: {
    marginTop: 20,
    fontSize: 18,
    color: Colors.primary500,
  },
});