import {createStackNavigator} from "@react-navigation/stack";
import {DiscoverPage} from "../pages/DiscoverPage";
import {WorkerPage} from "../pages/WorkerPage";
import {HomePage} from "../pages/HomePage";

const Stack = createStackNavigator();

export const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={'HomePage'}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name='HomePage'
                component={HomePage}
            />
            <Stack.Screen
                name='TopWorkerPage'
                component={WorkerPage}
            />
        </Stack.Navigator>
    );
}