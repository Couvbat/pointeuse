import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { QueryClient, QueryClientProvider } from "react-query";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const queryClient = new QueryClient();

import Home from "./pages/Home/Home";
import Timestamps from "./pages/Home/Timestamps/Timestamps";
import Details from "./pages/Home/Timestamps/Details";
import Calendrier from "./pages/Home/Calendrier/Calendrier";


const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#323264" },
      }}>
      <HomeStack.Screen name="Acceuil" component={Home}/>

      <HomeStack.Screen name="Timestamps" component={Timestamps} />
      <HomeStack.Screen name="Details" component={Details} />
      <HomeStack.Screen name="Calendrier" component={Calendrier} />
    </HomeStack.Navigator>
  );
}

import Settings from "./pages/Settings/Settings";

const SettingsStack = createStackNavigator();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#323264" },
      }}>
      <SettingsStack.Screen name="Settings" component={Settings} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "grey",
            tabBarActiveBackgroundColor: '#323264',
            tabBarInactiveBackgroundColor: '#323264',
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" size={24} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Paramètres"
            component={SettingsStackScreen}
            options={{
              tabBarLabel: "Paramètres",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cog" size={24} color={color} />
              ),
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}