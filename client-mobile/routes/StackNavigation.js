import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../pages/Dashboard";
import Detail from "../pages/Detail";

const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
export default StackNavigation;
