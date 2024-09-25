import {createStackNavigator} from "@react-navigation/stack";
import {ProfilePage} from "../pages/ProfilePage";
import {ChangeCredentialsPage} from "../pages/ChangeCredentialsPage";

const Stack = createStackNavigator();

export const UserAccountStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name='ProfilePage' component={ProfilePage} />
            <Stack.Screen name='ChangeCredentialsPage' component={ChangeCredentialsPage} />
        </Stack.Navigator>
    )
}
