import {createStackNavigator} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {RegistrationStack} from "./RegistrationStack";
import {UserAccountStack} from "./UserAccountStack";

const Stack = createStackNavigator();

export const UserStack = () => {

    const {activeUser} = useSelector(state => state.user)

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            {activeUser
                ? <Stack.Screen name='Account' component={UserAccountStack} />
                : <Stack.Screen name='Registration' component={RegistrationStack} />}

        </Stack.Navigator>
    )
}