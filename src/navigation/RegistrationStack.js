import {createStackNavigator} from "@react-navigation/stack";
import {SignInPage} from "../pages/registration/SignInPage";
import {SignUpPage} from "../pages/registration/SignUpPage";


const Stack = createStackNavigator();

export const RegistrationStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={'SignInPage'}
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen
                name='SignInPage'
                component={SignInPage}
            />
            <Stack.Screen
                name='SignUpPage'
                component={SignUpPage}
            />
        </Stack.Navigator>
    );
}