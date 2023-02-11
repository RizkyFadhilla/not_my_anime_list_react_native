import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Seasonal from "../pages/Seasonal";
import StackNavigation from "./StackNavigation";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "DashBoard") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Seasonal") {
              iconName = focused ? "calendar-outline" : "calendar";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          }, tabBarStyle:{
            backgroundColor:"black"
          }
        };
      }}
    >
      <Tab.Screen
        name="DashBoard"
        component={StackNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Seasonal"
        component={Seasonal}
      />
    </Tab.Navigator>
  );
}
export default TabNavigation;
