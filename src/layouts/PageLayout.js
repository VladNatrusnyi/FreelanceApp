import {Platform, SafeAreaView, ScrollView, View} from "react-native";
import {AppBgLayout} from "./AppBgLayout";

export const PageLayout = ({headPart, children}) => {
    return (
        <AppBgLayout>
            <SafeAreaView style={{flex: 1, paddingTop: Platform.OS === 'android' ? 40 : 0}}>
                {
                    headPart &&
                    <View style={{flex: 1}}>{headPart}</View>
                }
                <View style={{flex: 4, backgroundColor: '#fff'}}>
                    {children}
                </View>
            </SafeAreaView>
        </AppBgLayout>
    )
}
