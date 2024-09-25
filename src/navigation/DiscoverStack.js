
import {createStackNavigator} from "@react-navigation/stack";
import {DiscoverPage} from "../pages/DiscoverPage";
import {WorkerPage} from "../pages/WorkerPage";


const Stack = createStackNavigator();

export const DiscoverStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={'DiscoverPage'}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name='DiscoverPage'
                component={DiscoverPage}
            />
            <Stack.Screen
                name='WorkerPage'
                component={WorkerPage}
            />
        </Stack.Navigator>
    );
}