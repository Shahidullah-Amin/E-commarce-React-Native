import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen'
import SearchingScreen from "../screens/SearchingScreen";
import SearchResultsScreen from "../screens/SearchResultsScreen"


const Stack = createNativeStackNavigator();




const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name='Searching' component={SearchingScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name='SearchResults' component={SearchResultsScreen} options={{ animation: 'slide_from_right' }} />
        </Stack.Navigator>
    );
};

export default HomeStack;